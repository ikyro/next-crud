import { Task, useTasks } from 'hooks/useTasks'
import { useFormContext } from 'react-hook-form'
import { EditIcon } from './EditIcon'
import { Inputs } from './Form'
import { TrashIcon } from './TrashIcon'

export const TaskListItem = ({
  title,
  date,
  description,
  id,
  previous,
}: Partial<Task> & { previous: () => void }) => {
  const { deleteTask } = useTasks()
  const { setValue, setFocus } = useFormContext<Inputs>()

  const handleFocus = () => {
    setValue('title', title as string)
    setValue('description', description as string)
    setValue('id', id as string)

    previous()
    setFocus('title')
  }

  return (
    <li className='bg-white rounded-sm relative p-1.5'>
      <details>
        <summary className={'marker:content-[">"] cursor-pointer static'}>
          <span className={'ml-1 text-sm'}>{title}</span>
          <button
            className='absolute right-0.5 w-6 h-6'
            onClick={() => deleteTask(id as string)}
          >
            <TrashIcon />
          </button>
          <button
            className='absolute right-7 w-6 h-6'
            onClick={handleFocus}
          >
            <EditIcon />
          </button>
        </summary>
        <p className={'text-sm'}>{description}</p>
        <span className={'absolute text-xs right-0.5 bottom-0'}>
          {new Intl.DateTimeFormat('en-us', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(date)}
        </span>
      </details>
    </li>
  )
}
