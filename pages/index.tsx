import type { GetServerSideProps, NextPage } from 'next'
import { getCookie } from 'cookies-next'
import { DecodedIdToken } from 'firebase-admin/auth'
import { UserInfo } from 'firebase/auth'
import { auth } from 'services/firebase/admin'
import { UserCard } from 'components/UserCard'
import { useState } from 'react'
import { Container } from 'components/Container'
import { Controllers } from 'components/Controllers'
import { Login } from 'components/Login'
import { Form } from 'components/Form'
import { TasksList } from 'components/TasksList'

const Home: NextPage = () => {
  const [active, setActive] = useState<number>(0)

  const next = () => {
    if (2 === active) return

    setActive(active + 1)
  }

  const previous = () => {
    if (!active) return

    setActive(active - 1)
  }

  return (
    <div className='bg-black min-h-screen overflow-hidden flex flex-col items-center justify-center font-04b03'>
      <main className={'h-[26rem] w-80'}>
        <Container
          active={active}
          index={0}
        >
          <Login />
        </Container>
        <Container
          active={active}
          index={1}
        >
          <Form />
        </Container>
        <Container
          active={active}
          index={2}
        >
          <TasksList previous={previous} />
        </Container>
      </main>
      <style jsx>{`
        main {
          transform-style: preserve-3d;
          perspective: 300px;
        }
      `}</style>
      <Controllers
        next={next}
        previous={previous}
      />
      <UserCard />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie('token', { req, res }) as string

  try {
    const {
      name,
      email,
      picture,
      uid,
      firebase: { sign_in_provider },
    } = (await auth.verifyIdToken(token, true)) as Required<DecodedIdToken>

    const userInfo: UserInfo = {
      displayName: name,
      email,
      phoneNumber: null,
      photoURL: picture,
      providerId: sign_in_provider,
      uid,
    }

    return {
      props: {
        session: userInfo,
      },
    }
  } catch (error) {
    return {
      props: {
        session: null,
      },
    }
  }
}

export default Home
