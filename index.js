const extraerLinks = require('./extraerLinks');
const validateLinks = require('./validateLinks.js')


const mdLinks = (router, options = 0) => { 
  let promesaMdLinks = new Promise((resolve, reject) => {  
  extraerLinks(router)
  .then((values) => {
    if (options === '--validate' || '--stats --validate' || '--stats') { 
            validateLinks(values)
            .then ((result)=> {resolve(result)})} 
            else { resolve(values) }
            } 
  )
  })
  return promesaMdLinks
}; 

module.exports = mdLinks

