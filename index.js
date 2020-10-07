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
//path.resolve([...paths]);

// Leer los archivos // Retornar una promesas 
function toReadFile(file_path) {
  let textosArchivos = new Promise((resolve, reject) => {
    fs.readFile(file_path, "utf8", (err, data) => {
      if (err) reject(err);
      else { resolve(data) }
    });
  })
  return textosArchivos
};

// Estraer los datos al tener el DOM creado JSDOM 
function extractData(textoenHTML, path ) {
  let dom = new JSDOM(textoenHTML);
  const document = dom.window.document;
  let links = document.querySelectorAll("a");
  let contenedorInfo = [];
  links.forEach(objetos => {
    if (!contenedorInfo.includes(objetos.href)) { let objeto = new Object();
      objeto.Url = objetos.href;
      objeto.text = objetos.textContent;
      objeto.file = path;
      contenedorInfo.push(objeto) }
  })
  return contenedorInfo 
}

// pasar de formato MD a HTML 
function volverHTML(textolargo) {
  md = new MarkdownIt();
  let result = md.render(textolargo);
  return result
};






let archivos = fs.readdirSync('./')
console.log(archivos)

// Metodo No bloqueante. 
// USAR ESTE METODO para funcion 
fs.readdir('./', function (error, files) {

  if (error) { console.log(error) }
  else {

    files.forEach(filePath => {
      if (path.extname(filePath) == ".md") {
        console.log(filePath);
        toReadFile(filePath)
          .then((textos) => {
            const htmlGigante = volverHTML(textos);
            const arrayObjetos = extractData(htmlGigante , filePath )
            console.log (arrayObjetos)
          })
            .catch(
            // Registrar la razón del rechazo
            function(reason) {
              console.log('Manejar promesa rechazada ('+reason+') aquí.');
            });
      };
    });
  }
});

// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = (path, options = 0) => {


  // Creacion let alfanumerica, donde se guarda la operacion // accion que se realice 
  //con los parametros. 
  let contenedor = "";




  return contenedor
}

const prueba = [  {
  Url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
  text: 'Leer un archivo'
},
{
  Url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
  text: 'Leer un directorio'
},
{ Url: 'https://nodejs.org/api/path.html', text: 'Path' },
{
  Url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
  text: 'Linea de comando CLI'
},
{
  Url: 'https://medium.com/esteEsMIerror',
  text: 'Esta Es mi Error'
}
]

function validateLinks ( acaVaPrueba ) { 
  acaVaPrueba.forEach(objeto => {
    console.log(objeto.Url)
      axios.get( objeto.Url )
      .then(function (response) {
      if ( response.status = 200 ) {       
        console.log( objeto.Url  + ' // ok // '  + response.status +'// '+ objeto.text) 
        }
        else { console.log( objeto.Url  + ' // fail// ' + response.status + objeto.text)}
  }) 
 // }
   .catch(function (error) {
 throw ( error);
 })
})
}
validateLinks(prueba)