const { ApolloServer } = require("apollo-server");
// var mongoose = require('mongoose');
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
// mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true } );

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback(){
//     console.log("mongo db is connected");
// });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});

server.listen().then(({url}) => {
    console.log(`${url} is run`);
})