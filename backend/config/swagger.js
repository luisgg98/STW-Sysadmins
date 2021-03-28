let swaggerJSDoc = require('swagger-jsdoc');
let swaggerport = (process.env.PORT || '3000');
let nodeSwagger = `localhost:${swaggerport}`;

let swaggerDefinition = {
    info:{
        title:' Zitation web application API',
        version:'1.0.0',
        description:'API for the web application Zitation'
    },
    host:nodeSwagger,
    basePath:'/api/', //where the services are
    schemes:['http','https'] //working on http, in heroku we have to add https
}
let options = {
    swaggerDefinition:swaggerDefinition,
    // path to the API docs
    apis:['../routes/*.js']

};

// initialize swagger jsdoc
let swaggerSpec = swaggerJSDoc(options)


module.exports= swaggerSpec
