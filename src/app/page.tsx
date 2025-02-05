'use client'
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react'
import LockIcon from '@mui/icons-material/Lock';

export default function Home() {
  const SSOProviders = process.env.NEXT_PUBLIC_SSO_PROVIDERS?.split(',') || []
  const { data: session } = useSession()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
        />
        <h1 style={{'fontSize': '40px'}}>Dynamically Managing SSO Providers with Environment Variables</h1>
        <ul className="flex list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {!session &&
              SSOProviders.map((providerID) => {
                return (
                    <li className='pr-5 ssoButton' key={providerID}>
                      <button className="uppercase rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                              onClick={() => signIn(providerID.toLowerCase())}>
                        <LockIcon />
                        Sign In with {providerID}
                      </button>
                    </li>
                )
              })}
        </ul>
      </main>
    </div>
  );
}
