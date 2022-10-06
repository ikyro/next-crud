import { useTasks } from 'hooks/useTasks'
import { TaskListItem } from './TaskListItem'

export const TasksList = ({ previous }: { previous: () => void }) => {
  const { tasks, loading } = useTasks()

  console.log({ tasks })

  return (
    <>
      <h1>tasks</h1>
      <ul className='bg-black rounded-sm w-full p-1.5 h-full flex flex-col gap-1.5 overflow-auto'>
        {tasks.map(({ title, description, date, id }) => (
          <TaskListItem
            key={id}
            {...{ title, description, date, id, previous }}
          />
        ))}
      </ul>
    </>
  )
}
