import { NextResponse} from 'next/server'
import type { NextRequest} from 'next/server'

export function middleware (request: NextRequest) {
    if ( request.nextUrl.pathname.startsWith('/api/entries/')) {
        const id = request.nextUrl.pathname.replace('/api/entries/','')
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (!checkMongoIDRegExp.test(id)) {
                const urlRef = request.nextUrl.clone()
                urlRef.pathname = '/api/bad-request'
                urlRef.search = `?message=${id} is not valid MondoID`
                return NextResponse.rewrite(urlRef)
        }
    }

   return NextResponse.next()
}

export const config = {
    //matcher: 'about/:path*',
    //matcher: '/api/:path*',
    matcher: ['/api/entries/:path*']
}