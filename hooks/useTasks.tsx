import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { db } from 'services/firebase/client'
import { useAuth } from './useAuth'

type TasksContext = {
  addTask: (task: Task) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  editTask: (task: Task) => Promise<void>
  tasks: Task[]
  loading: boolean
}

export type Task<T = Date> = {
  title: string
  description: string
  date: T
  id: string
}

const Tasks = createContext({} as TasksContext)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(!!user)
  const [action, setAction] = useState()

  const addTask = async (task: Task) => {
    if (!user) return
    const docRef = doc(db, user.displayName as string, task.id)

    try {
      await setDoc(docRef, {
        ...task,
        state: process.env.NODE_ENV,
      })

      setTasks([...tasks, task])
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const deleteTask = async (id: string) => {
    if (!user) return

    const docRef = doc(db, user.displayName as string, id)
    const filterdTask = tasks.filter((task) => task.id !== id)

    try {
      await deleteDoc(docRef)
      setTasks(filterdTask)
    } catch (error) {
      console.error(error)
    }
  }

  const editTask = async (task: Task) => {
    if (!user) return
    const docRef = doc(db, user.displayName as string, task.id)

    try {
      await setDoc(docRef, {
        ...task,
        state: process.env.NODE_ENV,
      })

      setTasks(
        tasks.map((oldTask) => (task.id === oldTask.id ? task : oldTask))
      )
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const getAllTasks = async () => {
    if (!user) {
      setTasks([])
      setLoading(!loading)
      return
    }

    const collRef = collection(db, user.displayName as string)

    try {
      const querySnapshot = await getDocs(collRef)
      const docTasks = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as Task<Timestamp>[]
      const docFormating = docTasks.map(({ date, ...res }) => ({
        ...res,
        date: date.toDate(),
      }))

      setTasks(docFormating)
      setLoading(!loading)
    } catch (error) {
      console.error({ error })
      setLoading(!loading)
    }
  }

  useEffect(() => {
    getAllTasks()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Tasks.Provider value={{ addTask, deleteTask, tasks, loading, editTask }}>
      {children}
    </Tasks.Provider>
  )
}

export const useTasks = () => {
  const tasksContext = useContext(Tasks)

  if (!tasksContext)
    throw new Error('useTasks need be used inside TasksProvider')

  return tasksContext
}
