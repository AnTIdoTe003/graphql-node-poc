import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import users from "../constants/userConstant";

export async function initServer() {
  const app = express();
  app.use(express.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
      type Posts {
        post_id: String
        post_title: String
        user_id: String
        }

      type User {
        user_id: String
        name: String
        country: String
        posts: [Posts]
      }

      type Query {
        sayHello: String
        fetchUsers(user_id: String, post_id: String): [User]
      }
    `,
    resolvers: {
      Query: {
        sayHello: () => `Hello from Db's GraphQL Server`,
        fetchUsers: (
          parent: any,
          { user_id, post_id }: { user_id?: string; post_id?: string }
        ) => {
          if (user_id) {
            let filteredUsers = users.filter(
              (user) => user.user_id === user_id
            );

            if (post_id !== undefined && post_id !== null && post_id !== "") {
              filteredUsers = filteredUsers.map((user) => ({
                ...user,
                posts: user.posts.filter((post) => post.post_id === post_id),
              }));
            }

            return filteredUsers;
          }

          return users;
        },
      },
    },
  });
  await graphqlServer.start();
  app.use("/test-graphql", expressMiddleware(graphqlServer));
  return app;
}
