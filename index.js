const extraerLinks = require('./extraerLinks');
const validateLinks = require('./validateLinks.js')


// Crear una funcion que reciba dos parametros:
// Parametro uno:  string & segundo OPCIONAL : obj booleano validate 
const mdLinks = (router, options = 0) => { 
  let promesaMdLinks = new Promise((resolve, reject) => {  
  extraerLinks(router)
  .then((values) => {
    if (options === true) { 
            validateLinks(values)
            .then ((result)=> {resolve(result)})} 
            else { resolve(values) }
            } 
  )
  })
  return promesaMdLinks
}; 

module.exports = mdLinks
