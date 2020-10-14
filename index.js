module.exports = () => {
  // ...
};


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
let MarkdownIt = require('markdown-it');
const fsPromises = require('fs').promises;
const axios = require('axios').default;
const extraerLinks = require('./extraerLinks');
const validateLinks = require('./validateLinks.js')
const { resolve } = require('path');
//path.resolve([...paths]);


// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = (router, options = 0) => { 
  let promesaMdLinks = new Promise((resolve, reject) => {  
  extraerLinks(router)
  .then((values) => {
    if (options === true) { 
            validateLinks(prueba)
            .then ((result)=> {resolve(result)})} 
            else { resolve(values) }
            } 
  )
  })
  console.log(promesaMdLinks)
  return promesaMdLinks
}; 

mdLinks('./')


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
