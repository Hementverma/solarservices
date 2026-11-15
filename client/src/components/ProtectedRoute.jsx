import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/Logo'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-forest-950">
        <div className="flex flex-col items-center gap-5 text-center">
          <Logo light />
          <span className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-1/2 animate-pulse rounded-full bg-solar-400" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Checking your session
          </p>
        </div>
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}
