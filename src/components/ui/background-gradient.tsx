'use client'

import { cn } from "@/lib/utils"

export const BackgroundGradient = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-0.5 transition duration-300",
        className
      )}
      {...props}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl opacity-0 group-hover/card:opacity-100 transition duration-300 blur-xl" />
      <div className="relative bg-white dark:bg-gray-900 rounded-xl">{children}</div>
    </div>
  )
}

