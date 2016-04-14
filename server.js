import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import DataLayer from './data/data'

var app = express();
var database = DataLayer();

app.use('/graphql', GraphQLHTTP({
    schema: schema(database),
    graphiql:true
}))

app.get('/', (req, res) => {
    res.send("hello world");    
});


app.listen(5050);