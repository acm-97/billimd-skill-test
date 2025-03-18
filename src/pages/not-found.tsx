import {Button} from '@/components/ui/button'
import {MoveLeft} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted,
            or never existed.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
