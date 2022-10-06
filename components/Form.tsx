import { useAuth } from 'hooks/useAuth'
import { useTasks } from 'hooks/useTasks'
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form'
import { Button } from './Button'

export type Inputs = {
  title: string
  description: string
  id: string
}

export const Form = () => {
  const { user } = useAuth()
  const { addTask, editTask } = useTasks()
  const { register, handleSubmit, reset, setValue } = useFormContext<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = data.id.length
    const date = new Date()

    if (id) {
      await editTask({ ...data, date })
    } else {
      await addTask({ ...data, date, id: window.crypto.randomUUID() })
    }

    reset({ id: '', description: '', title: '' })
  }

  return (
    <>
      <form
        className={
          'grid grid-flow-row-dense gap-2 place-items-center w-full px-4'
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={'font-vcrosd text-lg'}>Task</h1>
        <input
          type='text'
          placeholder='task title'
          className='bg-black outline-none text-white w-full py-1.5 px-3 text-sm rounded-sm'
          {...register('title', {
            required: true,
            disabled: !user,
          })}
        />
        <textarea
          cols={30}
          rows={10}
          placeholder='task description'
          className='bg-black outline-none text-white w-full resize-none py-1.5 px-3 text-sm rounded-sm'
          {...register('description', {
            required: true,
            disabled: !user,
          })}
        />
        <input
          type='hidden'
          {...register('id')}
        />
        <Button
          className='bg-black text-white'
          disabled={!user}
        >
          submit
        </Button>
      </form>
    </>
  )
}
