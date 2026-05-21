import { Background } from '@cfg'
import { cn } from '@heroui/react'

export function AppBackground() {
  return (
    <div
      role="app-background"
      className={cn('max-xs:hidden max-xs:dark:block fixed inset-0 -z-10 overflow-hidden')}
    >
      <div className={cn('absolute inset-0', Background.CLASS)} />
      <div className="absolute top-0 left-0 size-[45vmin] -translate-x-1/3 -translate-y-1/3 rounded-full bg-sky-400/14 blur-3xl dark:bg-cyan-400/12" />
      <div className="absolute top-[72%] left-[18%] size-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/11 blur-3xl dark:bg-emerald-500/8" />
      <div className="absolute top-[18%] left-[78%] size-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/9 blur-3xl dark:bg-blue-500/6" />
      <div className="absolute top-[84%] left-[88%] size-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/11 blur-3xl dark:bg-violet-500/13" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-white/50 to-transparent dark:from-white/4" />
    </div>
  )
}
