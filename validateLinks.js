const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
let MarkdownIt = require('markdown-it');
const fsPromises = require('fs').promises;
const axios = require('axios').default;




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
                        newArray.okfail = 'ok';
                        return newArray
                    }
                    else {
                        let newArray = new Object();
                        newArray.Url = objeto.Url;
                        newArray.text = objeto.text;
                        newArray.file = objeto.file;
                        newArray.status = response.status;
                        newArray.okfail = 'fail'
                        return newArray
                    }
                })
            .catch(function (error) {
                let newArray = new Object();
                newArray.Url = objeto.Url;
                newArray.text = objeto.text;
                newArray.file = objeto.file;
                newArray.status = 503;
                newArray.okfail = 'fail'
                return newArray
                //console.log(error.message)
            })
    })
    return Promise.all(arrayValidados)

}

module.exports =  validateLinks
