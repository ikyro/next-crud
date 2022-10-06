import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider, User } from 'hooks/useAuth'
import { TasksProvider } from 'hooks/useTasks'
import { useForm, FormProvider } from 'react-hook-form'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: User }>) {
  const methods = useForm()

  return (
    <AuthProvider session={session}>
      <FormProvider {...methods}>
        <TasksProvider>
          <Component {...pageProps} />
        </TasksProvider>
      </FormProvider>
    </AuthProvider>
  )
}

export default MyApp
