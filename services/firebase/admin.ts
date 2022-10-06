import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { credential } from './credential'

export const app = getApps().length
  ? getApp()
  : initializeApp({ credential: cert(credential) })
export const auth = getAuth(app)
