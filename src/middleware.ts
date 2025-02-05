import {NextRequest} from 'next/server';
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const isHomePage = request.nextUrl.pathname === '/' ;


    // Accessing a protected route without a token will redirect to home page
    if(!token && !isHomePage){
        const url = request.nextUrl.clone()
        url.pathname = '/';
        return NextResponse.redirect(url)
    }else if(token && isHomePage){
        const url = request.nextUrl.clone()
        url.pathname = '/welcome';
        return NextResponse.redirect(url)
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|_next|_vercel|i18n|.*\\..*).*)'
    ]
};
