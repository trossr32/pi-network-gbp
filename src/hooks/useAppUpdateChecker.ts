import { useEffect, useState } from 'react'

interface UseAppUpdateCheckerOptions {
  intervalMinutes?: number
}

export function useAppUpdateChecker({ intervalMinutes = 5 }: UseAppUpdateCheckerOptions = {}): boolean {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)

  useEffect(() => {
    let localTimestamp: string | null = null

    const checkForUpdate = async () => {
      try {
        const res = await fetch('/pi-network-gbp/data/data.json', {
          cache: 'no-store',
        })
        const json = await res.json()
        const remoteTimestamp: string = json.lastUpdated

        if (!localTimestamp) {
          localTimestamp = remoteTimestamp
        } else if (remoteTimestamp !== localTimestamp) {
          setIsUpdateAvailable(true)
        }
      } catch (err) {
        console.error('Error checking for update:', err)
      }
    }

    const interval = setInterval(checkForUpdate, intervalMinutes * 60 * 1000)
    checkForUpdate()

    return () => clearInterval(interval)
  }, [intervalMinutes])

  return isUpdateAvailable
}
