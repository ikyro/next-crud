import { useAuth } from 'hooks/useAuth'
import { Button } from './Button'
import { CursedText } from './CursedText'

export const Login = () => {
  const { user, logOut, signIn } = useAuth()
  return (
    <>
      <CursedText />
      <div className={'flex items-center gap-5'}>
        {user ? (
          <Button
            className={'bg-black text-white'}
            onClick={logOut}
          >
            log out
          </Button>
        ) : (
          <Button
            className={'bg-black text-white'}
            onClick={signIn}
          >
            login
          </Button>
        )}  
      </div>
    </>
  )
}
