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
function extractData(textoenHTML, path) {
  let dom = new JSDOM(textoenHTML);
  const document = dom.window.document;
  let links = document.querySelectorAll("a");
  let contenedorInfo = [];
  links.forEach(objetos => {
    if (!contenedorInfo.includes(objetos.href)) {
      let objeto = new Object();
      objeto.Url = objetos.href;
      objeto.text = objetos.textContent;
      objeto.file = path;
      contenedorInfo.push(objeto)
    }
  })
  return contenedorInfo
}

// pasar de formato MD a HTML 
function transformIntoHTML(textolargo) {
  md = new MarkdownIt();
  let result = md.render(textolargo);
  return result
};

// leer Archivos
let archivos = fs.readdirSync('./')
console.log(archivos)

// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = (router, options = 0) => { }

fs.readdir('./', function (error, files) {

  if (error) { console.log(error) }
  else {
    const promises = [];
    files.forEach(filePath => {
      if (path.extname(filePath) == ".md") {
        console.log(filePath);
        toReadFile(filePath)
          .then((textos) => {
            const htmlGigante = transformIntoHTML(textos);
            const arrayObjetos = extractData(htmlGigante, filePath)
            console.log(arrayObjetos)
            promises.push(arrayObjetos) // NO SE ME AGREGA AL ARRAY! DEBO PREGUNTAR 
          })
          .catch(
            // Registrar la razón del rechazo
            function (reason) {
              console.log('Ocurrio un error con el archivo recibido  (' + reason + ') .');
            });
      }; // FIN IF 
    });// FIN FOREACH
    console.log(promises)
  }
});


//} ESTA SERA EL CIERRE DE MDLINKS 

const prueba = [{
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
}
  //,{
  //  Url: 'https://medium.com/esteEsMIerror',
  //  text: 'Esta Es mi Error'
  //}
]

function validateLinks(...acaVaPrueba) {
  let linksvalidados = []; // QUIERO GUARDAR TODO ACA 
  acaVaPrueba.forEach(objeto => {
    console.log(objeto.Url)
    axios.get(objeto.Url)
      .then(function (response) {
        if (response.status = 200) {
          //DEBO PREGUNTAR COMO GUARDAR ESTO, Y QUE SE VEA TAL CUAL 
          console.log(objeto.Url + ' // ok // ' + response.status + '// ' + objeto.text)
        }
        else { console.log(objeto.Url + ' // fail// ' + response.status + objeto.text) }
      })

      .catch(function (error) {
        throw (error);
      })
  })
}
validateLinks(prueba)


function metrics(...arrayPrueba) {

  let uniqueLinks = [];
  arrayPrueba.forEach(uniqueLink => {
    if (!arrayPrueba.includes(uniqueLink.href)) {
      arrayPrueba.push(uniqueLink)
    }
  })

  let validLinks = arrayPrueba.filter((links) => { if (links.status = 200) { return true; } })
  // REVISAR COMO SE DEBE MOSTRAR EL RESULTADO FINAL... 
  let finalResult = new Object();
  finalResult.Total = arrayPrueba.length;
  finalResult.Broken = arrayPrueba.length - validLinks.length;
  finalResult.Unique = uniqueLinks.length;

  console.log(finalResult)
}

