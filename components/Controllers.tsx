import { Button } from './Button'

type Props = Record<'next' | 'previous', () => void>

export const Controllers = ({ next, previous }: Props) => {
  return (
    <>
      <Button
        className='absolute text-4xl left-24 bottom-16 text-white'
        onClick={previous}
      >
        {'<'}
      </Button>
      <Button
        className='absolute text-4xl right-24 bottom-16 text-white'
        onClick={next}
      >
        {'>'}
      </Button>
    </>
  )
}
