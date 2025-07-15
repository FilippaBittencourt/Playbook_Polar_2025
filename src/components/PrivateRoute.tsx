// src/components/PrivateRoute.tsx
import React, { useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
  adminOnly?: boolean
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch('/api/verificar-autenticacao', {
          credentials: 'include',
        })
        const data = await res.json()
        if (data.autenticado) {
          // se rota for adminOnly e não for admin, redireciona
          if (adminOnly && data.usuario !== 'admin') {
            navigate('/home', { replace: true })
          } else {
            setAuthenticated(true)
          }
        } else {
          navigate('/login', { replace: true })
        }
      } catch {
        navigate('/login', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [navigate, adminOnly])

  if (loading || authenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default PrivateRoute
