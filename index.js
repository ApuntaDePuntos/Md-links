module.exports = () => {
  // ...
};


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
let MarkdownIt = require('markdown-it');
const fsPromises = require('fs').promises;
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
function extractData(textoenHTML) {
  // me falta traer path como parametro 
  let dom = new JSDOM(textoenHTML);
  const document = dom.window.document;
  let links = document.querySelectorAll("a");
  let contenedorInfo = [];
  links.forEach(objetos => {
    if (!contenedorInfo.includes(objetos.href)) { let objeto = new Object();
      objeto.Url = objetos.href;
      objeto.text = objetos.textContent;
      // agregar path como propiedad 
      contenedorInfo.push(objeto) }
    //contenedorInfo += objetos.textContent , objetos.href })
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
            const arrayObjetos = extractData(htmlGigante)
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



