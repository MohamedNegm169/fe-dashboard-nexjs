"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "./button"
import { Alert, AlertDescription } from "./alert"

interface RetryErrorProps {
  title?: string
  message: string
  onRetry: () => void
  isRetrying?: boolean
}

export function RetryError({ title = "Something went wrong", message, onRetry, isRetrying = false }: RetryErrorProps) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="space-y-3">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying} className="w-full bg-transparent">
          {isRetrying ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </>
          )}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
