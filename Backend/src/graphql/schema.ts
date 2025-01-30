import { gql } from "apollo-server-express";

const authSchema = gql`
  type AuthResponse {
    token: String!
    refreshToken: String!
    user: User!
  }

  type Mutation {
    loginUser(email: String!, password: String!): AuthResponse!
    refreshToken(refreshToken: String!): AuthResponse!
  }
`;

export default authSchema;
