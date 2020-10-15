#! / usr / bin / env nodo
//chmod + x cli.js           // Hacer ejecutable el archivo
const mdLinks = require('./index');
const metrics = require('./metrics');
const validateLinks = require('./validateLinks');
const process = require('process');

let router = process.argv[2]
let options = process.argv[3]

mdLinks(router)
    .then((result) => {
        console.log(result)
        switch (options) {
            case '--validate':
                return validateLinks(result)
                break;
            case '--stats':
                return metrics(result)
                break;
            case '--stats --validate':
                return metrics(result)
                break;
            default:
                console.log('Sorry, that option is not valid');
        }
    }) // cierre .then 



        // if (options == '--validate') { return validateLinks(result) }
        // if (options == '--stats ') { return metrics(result) }
        // if (options == '--stats --validate') {console.log(result) }

    



  // Leer argumentos parte de cli crear una funcion para cli que llame mdlinks validate y stats 
 // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
 //node cli.js README.md --stats