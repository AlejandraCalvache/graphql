const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

// Definir el esquema GraphQL (typeDefs) y los resolutores (resolvers)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hola Mundo',
  },
};

// Crear el servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Iniciar el servidor Apollo y aplicar middleware a Express
async function startServer() {
  await server.start(); // Iniciar Apollo Server
  server.applyMiddleware({ app }); // Aplicar el middleware de Apollo a Express

  // Servir la página HTML de "Hola Mundo"
  app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo desde GraphQL!</h1>');
  });

  // Iniciar el servidor en el puerto 4000
  app.listen(4000, () =>
    console.log(`Servidor escuchando en http://localhost:4000${server.graphqlPath}`)
  );
}

startServer(); // Llamar a la función que inicia el servidor
