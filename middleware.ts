import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/interests')) {
        const interestsCookie = request.cookies.get('interestsCookie');

        if (interestsCookie) {
            // console.log('Selected tags:', interestsCookie);
            const url = request.nextUrl.clone();
            url.pathname = '/explore';

            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: '/interests',
}