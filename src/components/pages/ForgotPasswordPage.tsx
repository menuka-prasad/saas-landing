"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card' // Adjusted import path from your example
import { Mail, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { DenaroImage } from '../DenaroImage'
import { supabase } from '@/lib/supabase/client' // Import your Supabase client
import { useTheme } from '../ThemeProvider'

export function ForgotPasswordPage() {
      const { resolvedTheme } = useTheme();
  
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const redirectUrl = `${window.location.origin}/auth/update-password`

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) throw error

      setIsEmailSent(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link.')
    } finally {
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
            <h1 className="text-foreground mb-2">Forgot Your Password?</h1>
            <p className="text-muted-foreground">
              No problem. Enter your email to get a reset link.
            </p>
          </div>

          <Card className="p-8 bg-card border-border">
            {isEmailSent ? (
              // --- SUCCESS MESSAGE ---
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-foreground text-xl font-semibold mb-2">
                  Check Your Email
                </h2>
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to{' '}
                  <strong>{email}</strong>. Please check your mail box.
                </p>
              </div>
            ) : (
              // --- FORM ---
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
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

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
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