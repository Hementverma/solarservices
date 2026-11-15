import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import Icon from '@/components/Icon'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <section className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-32">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-solar-400/10 blur-3xl" />
        <div className="container-page relative text-center">
          <p className="font-display text-[7rem] leading-none text-solar-400 sm:text-[10rem]">404</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">This page went off-grid.</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55">
            The page you are looking for may have moved or no longer exists. Let’s get you back to
            something useful.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              Back to home
              <Icon name="ArrowRight" size={17} />
            </Link>
            <Link to="/contact" className="btn-ghost-light">
              Contact us
              <Icon name="ArrowUpRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
