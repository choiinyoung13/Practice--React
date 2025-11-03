import ClientDemo from '@/components/ClientDemo'
import DataFetchingDemo from '@/components/DataFetchingDemo'
import RSCDemo from '@/components/RSCDemo'
import ServerActionsDemo from '@/components/ServerActionsDemo'
import fs from 'node:fs/promises'
import UsePromiseDemo from '@/components/UsePromisesDemo'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  const usersPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8')
      const users = JSON.parse(data)

      resolve(users)
      // reject('Error!')
    }, 2000)
  })

  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong!</p>}>
        <Suspense fallback={<p>Loading users...</p>}>
          <UsePromiseDemo usersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
