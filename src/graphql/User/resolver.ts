import UserService from "../../services/User"
import { CreateUserPayload,GenerateTokenPayload } from "../../types"

const queries = {
    getUserToken: async (_:any, {...payload}: GenerateTokenPayload) => {
        const token = await UserService.generateToken({...payload })
        return token
    }
}
const mutations = {
    create_user: async (_:any, {...payload}:CreateUserPayload) =>{
        const res = await UserService.createUser(payload);
        return res.id
    } 
}
 export const resolvers = {
    queries, mutations
}