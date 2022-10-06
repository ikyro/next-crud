import { ReactNode } from 'react'

export const Container = ({
  active,
  index,
  children,
}: {
  active: number
  index: number
  children?: ReactNode
}) => {
  return (
    <>
      <div className='p-3 bg-white text-black flex flex-col items-center justify-center rounded-sm h-full w-full absolute card'>
        {children}
      </div>
      <style jsx>{`
        .card {
          z-index: ${-Math.abs(active - index)};
          transition-duration: 300ms;
          transition-timing-function: linear;
          transition-property: transform filter;
          transform: translateX(calc(${active - index} * -10rem))
            translateZ(calc(${Math.abs(active - index) / 5} * -20rem))
            scale(calc(1 + ${Math.abs(active - index) / 5} * -0.4));
          filter: blur(calc(${Math.abs(active - index) / 4} * 0.5rem));
          pointer-events: ${active === index ? 'auto' : 'none'};
          user-select: ${active === index ? 'auto' : 'none'};
        }
      `}</style>
    </>
  )
}
