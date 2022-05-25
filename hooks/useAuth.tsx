import type { User, Session, Provider, ApiError } from '@supabase/supabase-js'
import React, { useContext, useState, useEffect, createContext } from 'react'
import supabase from '../supabase'

type AuthProviderProps = {
  children: any
}

type AuthContextValue = {
  signInWithGithub: () => Promise<{
    session: Session | null
    user: User | null
    provider?: Provider | undefined
    url?: string | null | undefined
    error: ApiError | null
  }>
  signOut: () => Promise<{
    error: ApiError | null
  }>
  user: User | null | undefined
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    setLoading(false)

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const value = {
    signInWithGithub: () =>
      supabase.auth.signIn({
        provider: 'github',
      }),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
