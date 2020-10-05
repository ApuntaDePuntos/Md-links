module.exports = () => {
  // ...
};


const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path'); 
//path.resolve([...paths]);

// Leer los archivos
function toReadFile (file_path) {
  fs.readFile( file_path, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  };

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
          toReadFile(filePath)};
  });  
}
});


// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = ( path , options = 0) => {


  // Creacion let alfanumerica, donde se guarda la operacion // accion que se realice 
  //con los parametros. 
  let contenedor = "";

  return contenedor
}



