'use client'
import { ReactNode } from "react"
import {Session} from 'next-auth'
import { SessionProvider as Provider } from "next-auth/react"

export default function SessionProvider({ children, session }: Readonly<{ children: ReactNode, session: Session | null }>) {
    return <Provider session={session}>{children}</Provider>
}