import { prisma } from "../lib"
import { createHmac, randomBytes } from 'crypto'
import type { CreateUserPayload } from '../types'

class UserService {
    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt)
          .update(password)
          .digest("hex");
        return hashedPassword;
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