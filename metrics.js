
function metrics(arrayPrueba , options) {
    let validLinks = arrayPrueba.filter((links) => { if (links.status == 200) { return true } })
    let uniqueLinks = [];

    arrayPrueba.forEach(uniqueLink => {
        if (!arrayPrueba.includes(uniqueLink.href)) {
            uniqueLinks.push(uniqueLink)
        }
    })
    
    if (options === '--stats'){
    let finalResult = new Object();// hey esto es de la CLI 
    finalResult.Total = arrayPrueba.length,
    finalResult.Unique = uniqueLinks.length
    return finalResult
    }
    if (options === '--stats --validate')
    {
    let finalResult = new Object();// hey esto es de la CLI 
    finalResult.Total = arrayPrueba.length,
    finalResult.Broken = arrayPrueba.length - validLinks.length,
    finalResult.Unique = uniqueLinks.length
    return finalResult }
};

module.exports = metrics

