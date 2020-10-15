#! / usr / bin / env nodo
//chmod + x cli.js           // Hacer ejecutable el archivo
const mdLinks = require('./index');
const metrics = require('./metrics');
const validateLinks = require('./validateLinks');
const process = require('process');

let router = process.argv[2]
let options = process.argv[3]

//preguntar si debo validar ? si se valida con o sin stats
//debo devolver estadisticas? 
(router , options) => {
if (options === false) {
    mdLinks(router)
    .then(console.log)}
if (options === true) {
    if (options == '--validate'){
        mdLinks(router, true)
        .then(console.log)}
    if (options == '--stats'){
        metrics(result)
        .then(console.log) }
    if (options == '--stats --validate'){
        metrics(result)
        .then(console.log) }
    else { console.log('Sorry, that option is not valid');
    console.log( 'you can use --validate , --stats , --stats --validate')}
}
}


mdLinks(router)
    .then((result) => {
        console.log(options)
        switch (options) {
            case '--validate':
                mdLinks(router, true)
                .then(console.log)
                break;
            case '--stats':
                metrics(result)
                .then(console.log)
                break;
            case '--stats --validate':
                metrics(result)
                .then(console.log)
                break;
            default:
                console.log('Sorry, that option is not valid');
                console.log( 'you can use --validate , --stats , --stats --validate');
        }
    }) 


  // Leer argumentos parte de cli crear una funcion para cli que llame mdlinks validate y stats 
 // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
 //node cli.js README.md --stats