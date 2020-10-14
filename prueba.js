const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
let MarkdownIt = require('markdown-it');
const fsPromises = require('fs').promises;
const axios = require('axios').default;


const prueba = [{
    Url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    file: 'mdPrueba.md',
    text: 'Leer un archivo'
},
{
    Url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    file: 'mdPrueba.md',
    text: 'Leer un directorio'
},
{ Url: 'https://nodejs.org/api/path.html', file: 'mdPrueba.md', text: 'Path' },
{
    Url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    file: 'mdPrueba.md',
    text: 'Linea de comando CLI'
},
{
    Url: 'https://medium.com/esteEsMIerror',
    file: 'mdPrueba.md',
    text: 'Esta Es mi Error'
    }
]
// utilizar map en vez de for each para mapear objetos a promesas .. array de promesas promises.all(promise)

function validateLinks(acaVaPrueba) {

    let arrayValidados = acaVaPrueba.map((objeto) => {
        return axios.get(objeto.Url)
            .then(
                function (response) {
                    if (response.status = 200) {
                        let newArray = new Object();
                        newArray.Url = objeto.Url;
                        newArray.text = objeto.text;
                        newArray.file = objeto.file;
                        newArray.status = response.status;
                        newArray.ok = 'ok';
                        return newArray
                    }
                    else {
                        let newArray = new Object();
                        newArray.Url = objeto.href;
                        newArray.text = objeto.textContent;
                        newArray.file = path;
                        newArray.status = response.status;
                        newArray.fail = 'fail'
                        return newArray
                    }
                })
                .catch(function (error) {
                        console.log(error.message)
                        })
    })
    Promise.all(arrayValidados)
    .then (
        ( result )=>{ console.log( result)})
    
}

validateLinks(prueba)