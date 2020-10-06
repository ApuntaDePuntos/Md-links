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
function toReadFile (file_path) {
  let textosArchivos = new Promise((resolve, reject) => {
  fs.readFile( file_path, "utf8", (err, data) => {
    if (err)  reject(err);
    else { resolve(data) }
  });
  })
  return textosArchivos
};

  function extractData (textoenHTML){
  let dom = new JSDOM(textoenHTML);
  const document = dom.window.document;
  let links = document.querySelectorAll("a");
  let contenedorInfo= [];
  links.forEach(objetos=>{ 
    
    if (!contenedorInfo.includes(objetos.href)) { contenedorInfo.push(objetos.textContent , objetos.href) }
    //contenedorInfo += objetos.textContent , objetos.href })
  console.log(contenedorInfo)
    }) 
}

let archivos= fs.readdirSync('./')
console.log(archivos)

// Metodo No bloqueante. 
// USAR ESTE METODO para funcion 
fs.readdir( './' , function (error, files) {
  
  if (error) {console.log(error) }
  else { 
    files.forEach(filePath => { 
      if (path.extname(filePath) == ".md") 
          {console.log(filePath); 
          toReadFile(filePath)
          .then((textos)=> {
          const htmlGigante = volverHTML(textos);
          extractData(htmlGigante)
          }) 
        };

  });  
}
});
function volverHTML (textolargo){
md = new MarkdownIt();
let result = md.render(textolargo);
return result
};
// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = ( path , options = 0) => {


  // Creacion let alfanumerica, donde se guarda la operacion // accion que se realice 
  //con los parametros. 
  let contenedor = "";

  return contenedor
}



