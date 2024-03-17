import { auth } from '../../../lib/firebase/index';

export async function POST(req: Request, res: Response) {
    try {
        await auth.signOut();
        return Response.json({
            status: 200,
            body: 'Logout successful'
        })
    } catch (error) {
        console.error('Error signing out:', error);
        return Response.json({
            status: 500,
            body: 'Logout failed'
        })
    }
    
}