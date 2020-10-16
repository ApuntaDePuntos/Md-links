#! / usr / bin / env nodo
//chmod + x cli.js           // Hacer ejecutable el archivo
const mdLinks = require('./index');
const metrics = require('./metrics');
const validateLinks = require('./validateLinks');
const process = require('process');

let router = process.argv[2]
let options = process.argv[3]



if (options.trim() === 0) {
    mdLinks(router)
    .then(console.log)}
if (options ) {
    if (options.trim() == '--validate'){
        mdLinks(router, options)
        .then(console.log)
        }
    if (options == '--stats' || '--stats --validate'){
        mdLinks(router, options)
        .then((result)=> {
            console.log(result)
            let metric = metrics(result , options)
            console.log(metric)
            return metric
        })}
    else { console.log('Sorry, that option is not valid');
    console.log( 'you can use --validate , --stats , --stats --validate')}
}




  // Leer argumentos parte de cli crear una funcion para cli que llame mdlinks validate y stats 
 // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
 //node cli.js README.md --stats