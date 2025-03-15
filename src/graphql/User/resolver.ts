import UserService from "../../services/User"
import { CreateUserPayload } from "../../types"

const queries = {}
const mutations = {
    create_user: async (_:any, {...payload}:CreateUserPayload) =>{
        const res = await UserService.createUser(payload);
        return res.id
    } 
}
 export const resolvers = {
    queries, mutations
}