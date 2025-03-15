import { ApolloServer } from '@apollo/server';
import { prisma } from '../lib';
import type { CreateUser } from '../types';
import { User } from './User/index';

async function StartGraphQLServer() {
    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
               hello:String
            }
            type Mutation {
                ${User.mutations}
            }
        
            
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
            }
            
        },
    });
    
    await graphqlServer.start()
    return graphqlServer
}
export { StartGraphQLServer }
    