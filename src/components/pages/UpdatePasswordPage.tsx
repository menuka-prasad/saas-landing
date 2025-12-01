"use client"

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthContext' 
import { PageTransition } from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { DenaroImage } from '../DenaroImage'
import { useTheme } from '../ThemeProvider'

export function UpdatePasswordPage() {
      const { resolvedTheme } = useTheme();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user, loading, updateUser } = useAuth()
  
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      setError('Invalid or expired password reset link. Please try again.')
    }
  }, [user, loading])

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      await updateUser({ password: password })
      
      toast.success('Password updated successfully! Please log in.')
      router.push('/auth/login')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password.')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
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
            <Link
              href="/"
              className="inline-flex items-center space-x-2 mb-6"
            >
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
              <span className="text-xl font-semibold text-foreground">
                Denaro Studio
              </span>
            </Link>
            <h1 className="text-foreground mb-2">Create New Password</h1>
            <p className="text-muted-foreground">
              Please enter your new password below.
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            {error ? (
              // --- ERROR STATE ---
              <div className="text-center text-destructive">
                <div className="flex justify-center mb-4">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Link Invalid</h2>
                <p className="text-destructive/80">{error}</p>
              </div>
            ) : (
              // --- FORM STATE ---
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    New Password
                  </Label>
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
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <Separator className="my-6 bg-border" />

            {/* Back to Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{' '}
              <Link
                href="/auth/login"
                className="text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}