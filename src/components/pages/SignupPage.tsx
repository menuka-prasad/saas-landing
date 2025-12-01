"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthContext'
import { PageTransition } from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { supabase } from '@/lib/supabase/client' 
import { Loader2 } from 'lucide-react'
import { Mail, Lock, User, Github, Chrome, ArrowRight, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DenaroImage } from '@/components/DenaroImage'
import { useTheme } from '@/components/ThemeProvider'

export function SignupPage() {
    const { resolvedTheme } = useTheme();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // --- NEW STATE FOR OTP ---
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  // --- END NEW STATE ---

  const { signup, loginWithGoogle, loginWithGithub } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    setIsLoading(true)
    
    try {
      await signup(name, email, password)
      
      setShowConfirmDialog(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP.')
      return
    }
    
    setIsVerifying(true)
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'signup',
      })

      if (error) {
        throw error
      }

      toast.success('Account verified successfully!')
      setShowConfirmDialog(false)
      router.push('/') 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Invalid or expired OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }


  const handleGoogleSignup = async () => {
    setIsLoading(true);
      try {
        await loginWithGoogle();
      } catch (error) {
        toast.error("Google login failed. Please try again.");
        setIsLoading(false); 
      }
    };

  const handleGithubSignup = async () => {
    setIsLoading(true)
    try {
      await loginWithGithub()
      
    } catch (error) {
      toast.error('GitHub signup failed. Please try again.')
    
      setIsLoading(false)
    }
  }

  const benefits = [
    'Access to all purchased templates',
    'Lifetime updates and support',
    'Download templates anytime',
    'Priority customer support',
    'Early access to new releases'
  ]

  return (
    <PageTransition>
      
      
      <Dialog open={showConfirmDialog}>
        <DialogContent 
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Check Your Email</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>. 
              Please enter it below to verify your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4 py-4">
            <InputOTP 
              maxLength={6} 
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <p className="text-xs text-muted-foreground">
              Check your inbox (and spam folder).
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full"
              onClick={handleVerifyOtp} 
              disabled={isVerifying}
            >
              {isVerifying && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isVerifying ? 'Verifying...' : 'Verify Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="min-h-screen bg-linear-to-b from-background to-background/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <Link href="/" className="inline-flex items-center space-x-2 mb-8">
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

              <h1 className="text-foreground mb-4">Start Building Faster Today</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of developers who trust Denaro Studio for premium, 
                production-ready templates.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>

            
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center lg:text-left mb-8 lg:hidden">
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
                <h1 className="text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">
                  Start your journey with premium templates
                </p>
              </div>

              <Card className="p-8 bg-card border-border">
                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-input-background border-border"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

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
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
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
                        minLength={8}
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      className="mt-1"
                      disabled={isLoading}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? 'Creating account...' : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative mb-4 mt-4">
                  <Separator className="bg-border" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Or
                  </span>
                </div>


                <div className="space-y-3 mb-2">
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-primary"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-primary"
                    onClick={handleGithubSignup}
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </div>

                <Separator className="bg-border" />

                {/* Login Link */}
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}