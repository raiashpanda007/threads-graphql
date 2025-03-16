import { prisma } from "../lib"
import { createHmac, randomBytes } from 'crypto'
import JWT from 'jsonwebtoken'
import type { CreateUserPayload , GenerateTokenPayload} from '../types'

class UserService {
    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    public static async generateToken ({email, password}: GenerateTokenPayload) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("User not found")
        }
        const hashedPassword = UserService.generateHash(user.salt, password)
        if (hashedPassword !== user.password) {
            throw new Error("Invalid password")
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not found")
        } 
        const token =   JWT.sign({email,id:user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return token
        
    }
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;

        const salt = randomBytes(32).toString();
        const hashedPassword = UserService.generateHash(salt, password);

        return prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }

}

export default UserService;