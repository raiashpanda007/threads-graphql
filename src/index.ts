import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

async function StartServer() {

    const app = express()
    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query:{
                hello: () => 'Hello World!'
            }
        },
    });
    app.use(express.json())
    await graphqlServer.start()


    app.use('/graphql', expressMiddleware(graphqlServer))
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000')
    }
    )
}

StartServer()