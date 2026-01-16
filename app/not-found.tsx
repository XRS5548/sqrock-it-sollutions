// app/not-found.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Server, Cpu, Wifi } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-4 md:p-8 overflow-hidden">
      {/* Animated background tech shapes */}
      <TechShapesBackground />
      
      {/* Main content */}
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Brand Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <Link href="/">
              <div className="inline-flex items-center gap-2 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-20 group-hover:opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-gray-800 group-hover:border-blue-500/30 transition-colors">
                    <Cpu className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  Sqrock <span className="text-blue-400">IT Solutions</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Animated 404 */}
          <div className="relative mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.3 
              }}
              className="text-8xl md:text-9xl font-bold tracking-tighter"
            >
              <GlitchText text="404" />
            </motion.div>
            
            {/* Floating animation for background 404 */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl md:text-[12rem] font-bold opacity-5 pointer-events-none select-none z-[-1]"
            >
              404
            </motion.div>
          </div>

          {/* Card with content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-2xl shadow-blue-900/10">
              <CardContent className="pt-12 pb-8 px-6 md:px-12">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Page Not Found
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                >
                  Looks like you&apos;ve hit a broken link or the page doesn&apos;t exist.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 group"
                  >
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                      Go Back Home
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 text-gray-300 hover:text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 group"
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Contact Support
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 text-gray-500 text-sm"
          >
            Error code: 404 • Sqrock IT Solutions
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// Glitch text component
function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block">
      <motion.span
        animate={{
          x: [0, -2, 2, -2, 2, 0],
          y: [0, 2, -2, 2, -2, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
        className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-300"
      >
        {text}
      </motion.span>
      
      {/* Glitch effect layers */}
      <motion.span
        animate={{
          x: [0, 2, -1, 2, -2, 0],
          opacity: [0, 0.3, 0, 0.3, 0, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
        className="absolute top-0 left-0 text-blue-500"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [0, -2, 1, -2, 2, 0],
          opacity: [0, 0.2, 0, 0.2, 0, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
        className="absolute top-0 left-0 text-purple-500"
      >
        {text}
      </motion.span>
    </div>
  )
}

// Background tech shapes component
function TechShapesBackground() {
  const shapes = [
    { icon: Server, delay: 0, color: 'blue' },
    { icon: Cpu, delay: 0.3, color: 'purple' },
    { icon: Wifi, delay: 0.6, color: 'cyan' },
    { icon: Server, delay: 0.9, color: 'blue' },
    { icon: Cpu, delay: 1.2, color: 'purple' },
    { icon: Wifi, delay: 1.5, color: 'cyan' },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0,
            scale: 0.5,
            x: Math.random() * 100 - 50 + 'vw',
            y: Math.random() * 100 - 50 + 'vh'
          }}
          animate={{ 
            opacity: 0.05,
            scale: 1,
            rotate: 360,
            x: [
              Math.random() * 100 - 50 + 'vw',
              Math.random() * 100 - 50 + 'vw',
              Math.random() * 100 - 50 + 'vw'
            ],
            y: [
              Math.random() * 100 - 50 + 'vh',
              Math.random() * 100 - 50 + 'vh',
              Math.random() * 100 - 50 + 'vh'
            ]
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: shape.delay,
            ease: "linear"
          }}
          className={`absolute text-${shape.color}-400/10`}
        >
          <shape.icon className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
      ))}
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh'
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}