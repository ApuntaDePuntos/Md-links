function metrics(arrayPrueba) { 

    let uniqueLinks = [];
    arrayPrueba.forEach(uniqueLink => {
        if (!arrayPrueba.includes(uniqueLink.href)) {
            uniqueLinks.push(uniqueLink)
        }
    })

    let validLinks = arrayPrueba.filter((links) => { if (links.status = 200) { return true; } })
    let finalResult = new Object();// hey esto es de la CLI 
    finalResult.Total = arrayPrueba.length;
    finalResult.Broken = arrayPrueba.length - validLinks.length;
    finalResult.Unique = uniqueLinks.length;
    //console.log(finalResult)
    return finalResult
}

  // Leer argumentos parte de cli crear una funcion para cli que llame mdlinks validate y stats 
 // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
 //node cli.js README.md --stats