
import {auth} from '../../../lib/firebase/index';
import { signInWithEmailAndPassword } from 'firebase/auth';




export async function POST(req: Request, res: Response) {
    try {
        const b = await req.json();
        const userCred = signInWithEmailAndPassword(auth, b.email, b.password)
        const user = (await userCred).user
        return Response.json({
            res: 200,
            body: user
        })
    } catch (error: any) {
        console.error('Error logging in:', error.message);
        return Response.json({
            status: 405,
            body: "Invalid credentials"
        })
    }
}