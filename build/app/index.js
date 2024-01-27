"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const userConstant_1 = __importDefault(require("../constants/userConstant"));
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const graphqlServer = new server_1.ApolloServer({
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
                    fetchUsers: (parent, { user_id, post_id }) => {
                        if (user_id) {
                            let filteredUsers = userConstant_1.default.filter((user) => user.user_id === user_id);
                            if (post_id !== undefined && post_id !== null && post_id !== "") {
                                filteredUsers = filteredUsers.map((user) => (Object.assign(Object.assign({}, user), { posts: user.posts.filter((post) => post.post_id === post_id) })));
                            }
                            return filteredUsers;
                        }
                        return userConstant_1.default;
                    },
                },
            },
        });
        yield graphqlServer.start();
        app.use("/test-graphql", (0, express4_1.expressMiddleware)(graphqlServer));
        return app;
    });
}
exports.initServer = initServer;
