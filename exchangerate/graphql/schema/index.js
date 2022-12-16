const { gql } = require('apollo-server');
const typeDefs = gql`
type Query {
    getExchangeRate(src:String!, tgt:String!): ExchangeInfo
}

type Mutation {
    postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
    deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
}

input InputUpdateExchangeInfo {
    src: String!,
    tgt: String!,
    rate: Float!,
    date: String
}
input InputDeleteExchangeInfo {
    src: String!,
    tgt: String!,
    date: String!
}

type ExchangeInfo {
    src: String!,
    tgt: String!,
    rate: Float!,
    date: String!

}`;

module.exports = typeDefs

