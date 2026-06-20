"use client"

import { useState }  from "react"
import Link          from "next/link"
import { useRouter } from "next/navigation"
import { motion }    from "framer-motion"
import { signIn }    from "next-auth/react"
import {
  Compass, Mail, Lock, Eye, EyeOff,
  User,  ArrowRight, Phone
} from "lucide-react"
import {FaChrome} from "react-icons/fa"

import toast from "react-hot-toast"


export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: ""
  })
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Registration failed")
        return
      }

      await signIn("credentials", {
        email:    form.email,
        password: form.password,
        redirect: false,
      })

      toast.success("Welcome to Safarni! 🎉")
      router.push("/dashboard")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl
              flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400
              bg-clip-text text-transparent">
              Safarni
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Create account</h1>
          <p className="text-white/40 text-sm">Start your journey today</p>
        </div>

        <div className="card p-8">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 border border-white/10
              rounded-xl text-sm font-medium hover:bg-white/5 transition-colors mb-5"
          >
            <FaChrome className="w-5 h-5 text-blue-400" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Mohammed Sherif"
                  required
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                Phone <span className="text-white/20">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+20 1234567890"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}