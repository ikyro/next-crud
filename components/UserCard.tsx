import { useAuth } from 'hooks/useAuth'
import Image from 'next/image'

export const UserCard = () => {
  const { user } = useAuth()

  return (
    <>
      <div className='absolute bg-white rounded-sm top-6 right-6 w-44 h-14 flex items-center gap-4'>
        {user?.photoURL ? (
          <Image
            src={user.photoURL}
            alt={'random image generator'}
            width={56}
            height={56}
            className={'rounded-l-sm'}
          />
        ) : (
          <p className={'text-5xl text-center w-16 mt-2.5 font-omori-scary'}>
            ?
          </p>
        )}
        <div className={'flex flex-col justify-center'}>
          <h1 className={'font-vcrosd'}>{`${user?.displayName}`}</h1>
          <p className={`font-omori text-sm`}>{user?.providerId ?? 'null'}</p>
        </div>
      </div>
    </>
  )
}
