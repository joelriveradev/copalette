export function getRelativeTime(createdAtISO: string): string {
  const createdAt = new Date(createdAtISO)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000)

  if (seconds < 0) {
    return 'just now'
  }

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  for (const key in intervals) {
    const interval = intervals[key]
    const count = Math.floor(seconds / interval)

    if (count >= 1) {
      return `${count} ${key}${count !== 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}
