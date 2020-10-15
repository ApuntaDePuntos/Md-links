
function metrics(arrayPrueba) {
    // agregar parametro -- stats y validate -stats aca creo  junto con los if 
    // --stats Total Unique 
    // los dos Total Broken Unique 
    let uniqueLinks = [];
    arrayPrueba.forEach(uniqueLink => {
        if (!arrayPrueba.includes(uniqueLink.href)) {
            uniqueLinks.push(uniqueLink)
        }
    })
    let validLinks = arrayPrueba.filter((links) => { if (links.status == 200) { return true } })
    let finalResult = new Object();// hey esto es de la CLI 
    finalResult.Total = arrayPrueba.length;
    finalResult.Broken = arrayPrueba.length - validLinks.length;
    finalResult.Unique = uniqueLinks.length;
    //console.log(finalResult)
    return finalResult
};

module.exports = metrics

