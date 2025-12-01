"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthContext'
import { PageTransition } from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components//ui/card'
import {  Mail, Lock, Github, Chrome, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { DenaroImage } from '@/components/DenaroImage'
import { useTheme } from '../ThemeProvider'

export function LoginPage() {
    const { resolvedTheme } = useTheme();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, loginWithGoogle, loginWithGithub } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      toast.success('Welcome back!')
      router.push('/')
    } catch (error) {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
  setIsLoading(true);
  try {
    await loginWithGoogle();
  } catch (error) {
    toast.error("Google login failed. Please try again.");
    setIsLoading(false); 
  }
};

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithGithub()
      
    } catch (error) {
      toast.error('GitHub login failed. Please try again.')
    
      setIsLoading(false)
  }
}

  return (
    <PageTransition>
      
      
      <div className="min-h-screen bg-linear-to-b from-background to-background/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 from-primary to-accent rounded-lg flex items-center justify-center">
                   <DenaroImage
                width={40}
                height={40}
                fallBackHeight={40}
                fallBackWidth={40}
                alt="Logo"
                src={resolvedTheme === "dark" ? "../logo-dark.svg" : "../logo-light.svg"}
              />
              </div>
              <span className="text-xl font-semibold text-foreground">Denaro Studio</span>
            </Link>
            <h1 className="text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Login to access your templates and dashboard
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            {/* Social Login Buttons */}
            

            {/* Email Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-input-background border-border"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Logging in...'
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative mb-6">
              <Separator className="bg-border" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                Or
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full border-border hover:border-primary"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-border hover:border-primary"
                onClick={handleGithubLogin}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            

            <Separator/>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  )
}
