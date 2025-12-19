import crypto from 'crypto'

// Simple admin authentication using environment variables
// For production, consider using NextAuth.js or similar

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const validUsername = process.env.ADMIN_USERNAME
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!validUsername || !validPasswordHash) {
    console.error('Admin credentials not configured in environment variables')
    return false
  }

  const providedPasswordHash = hashPassword(password)

  return username === validUsername && providedPasswordHash === validPasswordHash
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}
