import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './client'

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider())
  } catch (error) {
    console.error({ error })
  }
}
