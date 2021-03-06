import express from 'express';
import graphqlHTTP from 'express-graphql';
import fs from 'fs';
import { graphql } from 'graphql';
import schema from './schema';
import webpack from 'webpack';

const app = express();

/**
 * Creates up the graphql server
 */
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

/**
 * Returns the HTML shell.
 */
app.get('/', function (req, res) {
    res.send(`<html>
        <head>
            <title>Navigation Relay</title>
            <style>
                table{border-collapse:collapse;}
                table,td,th{border:1px #000 solid;}
                .label{margin-left:50px;width:100px;float:left;}
            </style>
        </head>
        <body>
            <div id="content"></div>
            <script src="/app.js" ></script>
        </body>
    </html>`);
});

/**
 * Dynamically runs webpack to return the JavaScript. Don't copy this, webpack
 * should be part of the build step. 
 */
app.get('/app.js', function (req, res) {
    webpack({
        entry: "./index.js",
        output: {
            path: __dirname,
            filename: "app.js"
        },
        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        }
    }, function(err, stats) {
        fs.createReadStream('./app.js')
            .pipe(res);
    })
});

app.listen(8080);
