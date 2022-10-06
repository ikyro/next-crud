import { deleteCookie, setCookie } from 'cookies-next'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  UserInfo,
} from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from 'services/firebase/client'
import { signOut } from 'firebase/auth'

export type User = Required<UserInfo> | null

type AuthType = {
  user: User
  signIn: () => Promise<void>
  logOut: () => Promise<void>
}

// @ts-ignore
const Auth = createContext<AuthType>()

export const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode
  session: User
}) => {
  const [user, setUser] = useState<User>(session)

  const signIn = async () => {
    try {
      signInWithPopup(auth, new GoogleAuthProvider())
    } catch (error) {
      console.error(error)
    }
  }

  const logOut = async () => {
    try {
      signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (userState) => {
      if (userState) {
        const {
          providerData: [userInfo],
        } = userState

        const idToken = await userState.getIdToken(true)
        setCookie('token', idToken)
        setUser(userInfo)
      } else {
        deleteCookie('token')
        setUser(userState)
      }
    })
  }, [])

  return (
    <Auth.Provider value={{ user, signIn, logOut }}>{children}</Auth.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(Auth)

  if (!authContext) throw new Error('useAuth need be used inside AuthProvider')

  return authContext
}
