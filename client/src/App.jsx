import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Solutions from '@/pages/Solutions'
import ServiceDetail from '@/pages/ServiceDetail'
import Brands from '@/pages/Brands'
import Calculator from '@/pages/Calculator'
import Subsidy from '@/pages/Subsidy'
import Locations from '@/pages/Locations'
import LocationDetail from '@/pages/LocationDetail'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))

function AppFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-mist">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-forest-200 border-t-forest-700" />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-forest-500">
          Loading
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<AppFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<ServiceDetail />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/pm-surya-ghar-subsidy" element={<Subsidy />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:slug" element={<LocationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  )
}
