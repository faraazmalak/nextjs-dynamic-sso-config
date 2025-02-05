'use client'
import {signOut, useSession} from "next-auth/react";

export default function Welcome() {
  const { data: session } = useSession()

  return (
      <>
          <h1 style={{'fontSize': '40px'}} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              Welcome,<span style={{'fontSize': '30px'}}>{session?.user?.name}!</span>
          </h1>
          {
              session &&
              <div className='flex-col flex items-center'>
                  <button className="uppercase rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                          onClick={() => signOut()}
                  >
                      Sign Out
                  </button>
              </div>
          }
      </>

  );
}
