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
const { resolve } = require('path');
//path.resolve([...paths]);


// Validar los links 
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
                      newArray.Url = objeto.Url;
                      newArray.text = objeto.text;
                      newArray.file = objeto.file;
                      newArray.status = response.status;
                      newArray.fail = 'fail'
                      return newArray
                  }
              })
              .catch(function (error) {
                let newArray = new Object();
                      newArray.Url = objeto.Url;
                      newArray.text = objeto.text;
                      newArray.file = objeto.file;
                      newArray.status = 503;
                      newArray.fail = 'fail'
                      return newArray
                      //console.log(error.message)
                      })
  })
return Promise.all(arrayValidados)
  
}

// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = (router, options = 0) => { 
  extraerLinks(router)
  .then((values) => {
    if (options === true) { 
            validateLinks(prueba)
            .then ((result)=> {resolve(result)})} 
            else { resolve(values) }
            } 
  )
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
