"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Logo({w}:{w?:number}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const width = w || 200 

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <img
      src={resolvedTheme === "dark" ? "/logo/dark.png" : "/logo/light.png"}
      width={width} height={80} loading="lazy"
      alt="SQROCK Logo"
    />
  )
}
