import { Link } from 'react-router-dom'

import Container from '@/components/common/Container'

function NotFoundPage() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The route you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Return home
        </Link>
      </Container>
    </main>
  )
}

export default NotFoundPage