const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
let MarkdownIt = require('markdown-it');
const { resolve } = require('path');
const fsPromises = require('fs').promises;
const axios = require('axios').default;


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

//TraerArchivos
function bringfiles(router) {
    const arrayFile = [];
    files = fs.readdirSync(router);
    files.forEach(file => {
        if (path.extname(file) == ".md") {
            arrayFile.push(path.join(router, file))
        }
    })
    return arrayFile
}

//Funcion principal para MDLINKS 
function extraerLinks(router) {
    let arrayInformacion = [];
    // leer directorio
    const files = bringfiles(router)
    const promises = files.map((filePath) => {
        const promiseFile = new Promise((resolve, reject) => {
            toReadFile(filePath)
                .then((textos) => {
                    const htmlGigante = transformIntoHTML(textos);
                    arrayInformacion = extractData(htmlGigante, filePath)
                    resolve(arrayInformacion)
                })
                .catch(function (reason) {
                    //reject('Ocurrio un error con el archivo recibido  (' + reason + ') .');
                });
        })
        return promiseFile
    });
    let promesaFinal = Promise.all(promises).then((values) => {
    return  values.flat()
    })
    return promesaFinal
}


module.exports =  extraerLinks