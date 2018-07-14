/**Aragogue is a simple and intelligent spider of the Internet that scrapes
 *  data of public resources by the transparency transparency portal of 
 * the National Fund of Education Development #FNDE#
 *
 * Aragogue é uma aranha simples e inteligente da Internet que raspa 
 * dados de recursos públicos pelo portal de transparência do governo o 
 * Fundo Nacional de Desenvolvimento da Educação #FNDE#
 */

//register begin of execution - registrar inicio da execução
const begin = Date.now()

console.log("Welcome to Aragog scrapper")
console.log("Bem vindo ao raspador Aragog")

//import libraries useds - importar biblioteca ultilizad
const axios = require("axios")
const fs = require('fs')
const qs = require("querystring")
const {
    JSDOM
} = require("jsdom");

//import data base - importar banco de dados
const inputData = require("./listaMG.json")
let dataBase = require("./dataBase.json")
let byCityDataBase = require("./byCityDataBase.json")

//register properties of current database - registrar propriedades do banco de dados atual
let lengthDataBase = dataBase.length
let lastRun = new Date(require('fs').statSync('./dataBase.json').mtimeMs)
let lastMod = lastRun.getDate() + "/" + (lastRun.getMonth() + 1) + "/" + lastRun.getFullYear() + " - " + lastRun.getDate() + ":" + lastRun.getMinutes()

console.log("Last modified on " + lastMod + " with: " + lengthDataBase + " funds registered")
console.log("Última modificação em " + lastMod + " com: " + lengthDataBase + " verbas registradas")

//target address - endereço do alvo
const url = "http://www.fnde.gov.br/pls/simad/internet_fnde.liberacoes_result_pc"

//filter database to get only useful data - filtrar banco de dados para obter apenas dados úteis
const filterByCitiesCod = (e) => {
    return {
        "cities": e.MUNICIPIO,
        "codC": e.CNPJ
    }
}
filteredDataBase = inputData.map(filterByCitiesCod)

//choose locations and year scraping targets - escolher  locais e ano alvos para raspagem
//choose target year - escola ano alvo
//choose targets cities #"MG" for all cities of Minas Gerais#- escolher cidades alvo #"MG" para todas cidades de Minas Gerais#
const year = 2018
const cities = ["MG"]

//filter database to get only selected cities - filtrar banco de dados para obter apenas cidades selecionadas
const getBycities = (e) => {
    for (let value of cities) {
        if (e.cities == value) {
            return e
        }
    }
}

//filter database to get only selected cities - banco de dados de filtro para obter apenas cidades selecionadas
if (cities[0] == "MG") {
    selectedDataBase = filteredDataBase
} else {
    selectedDataBase = filteredDataBase.filter(getBycities)
}


//requisition counters - contadores de requisiçoes
let totalRequests = selectedDataBase.length
let completedRequests = 0



//request data function - função solicitar dados
const getHTML = (e) =>
    axios({
        method: 'post',
        url,
        data: qs.stringify({
            "p_ano": year,
            "p_verifica": "sigef",
            "p_programa": "",
            "p_cgc": e.codC,
        }),
        headers: {},
    })
    //mount DOM - montar o DOM
    .then(res => {
        //progress notifier - notificador de progresso
        completedRequests = 1 + completedRequests
        let progressRequests = (((completedRequests) / (totalRequests)) * 100).toFixed(2)
        console.log(progressRequests + "%")
        const document = new JSDOM(res.data)
        const window = document.window
        const $ = require('jquery')(window)

        //find and parse wanted data - encontrar e analisar dados desejados
        let table = $("table")
        if (table.length > 3) {
            for (let i = 3; i < table.length; i++) {
                let line = table[i].rows;
                for (let j = 2; j < (line.length - 1); j++) {
                    let cell = line[j].cells;
                    let part = {
                        "Municipio": (e.cities),
                        "Codigo": (e.codC),
                        "Data": (cell[0].textContent),
                        "Nome da Verba": (line[0].cells[0].textContent),
                        "Parcela": (cell[3].textContent),
                        "Valor": (cell[2].textContent)
                    }

                    //add only new data to database - adicionar apenas novos dados ao banco de dados              


                    let add = (array, value) => {
                        array.push(value)
                        return console.log("+")
                        
                    }

                    let unique = (array, value) => {
                        for (let index = 0; index < array.length; index++) {
                            if (JSON.stringify(array[index]) == JSON.stringify(value)) {
                                return console.log(".")
                            }
                        {
                        }}
                        return add(array, value)
                    }
                    unique(dataBase, part)


                }

            }
        } else {}
    })
    //handle error - manejando erros
    .catch(err => console.log(err))

//declare scrape all function  - declarando função raspar tudo
async function scrapeAll() {
    for (let k = 0; k < byCityDataBase.length; k++) {
        await Promise.all(byCityDataBase[k].map(getHTML))
        console.log("initializing scraping in:" + byCityDataBase[k][0].cities)
        console.log("inicializando raspagem em: " + byCityDataBase[k][0].cities)
    }
    await reportScrape()
    await writeData()
}
//generate scraping report - gerar relatório da raspagem
const reportScrape = () => {
    let ends = Date.now()
    let timeProcess = (((ends - begin) / 1000)).toFixed(2)
    let lengthOfNewData = dataBase.length
    console.log(lengthDataBase + " escolas verificadas, " + (lengthOfNewData - lengthDataBase) + " novas verbas registradas, totalizando " + (lengthDataBase + lengthOfNewData) + " verbas cadastradas, executado em " + timeProcess + " segundos");
    console.log(lengthDataBase + " verified schools, " + (lengthOfNewData - lengthDataBase) + " new registered funds, totaling " + (lengthDataBase + lengthOfNewData) + " registered funds, executed on " + timeProcess + " seconds");
}
//write the data base on dataBase.json - escreve o banco de dados em dataBase.json
const writeData = () => {
    dataBase = JSON.stringify(dataBase)
    fs.writeFile('dataBase.json', dataBase, 'utf8', (err) => {
        if (err) {
            console.log(err)
            console.log("erro while write data - erro ao escrever dados")
        }
    })
}

//process selector - seletor de processo
if (cities[0] == "MG") {
    console.log("Total of " + byCityDataBase.length + " cities")
    console.log("Total de " + byCityDataBase.length + " cidades")
    //scrape all the state of Minas Gerais - raspar todo o estado de Minas Gerais
    scrapeAll()

} else {
    //scrape only selected cities - raspar apenas cidades selecionadas
    Promise.all(selectedDataBase.map(getHTML))
        .then(() => {
            reportScrape()
        }).then(() => {
            writeData()
        })
        .catch(err => console.log(err))
}