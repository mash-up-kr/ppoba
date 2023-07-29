// A faulty API route to test Sentry's error monitoring
export default function handler(req: Request, res: Response): number {
  throw new Error('Sentry Example API Route Error')
  return 1
}
