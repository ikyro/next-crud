import { useAuth } from 'hooks/useAuth'

export const CursedText = () => {
  const { user } = useAuth()
  return (
    <>
      <p className={'text-3xl font-omori-scary'}>Hi {user?.displayName}</p>
    </>
  )
}
