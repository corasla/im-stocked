const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
const token = 'sandbox_c0c37sn48v6o915a17h0' // sandbox
// const token = 'c0c37sn48v6o915a17gg' // real
api_key.apiKey = token
const finnhubClient = new finnhub.DefaultApi()

const hashedQueryResults = {}

app.get('/stock_data', async (req, res) => {
  const {
    start,
    end,
    str,
  } = req.query
  if (!start || !end || !str) {
    res.send({err: 'Please specify str, start and end'})
  }

  console.log(start, end, str)

  let symbolMatch = hashedQueryResults[str]
  if (!symbolMatch) {
    const queryResponse = await axios.get(`https://finnhub.io/api/v1/search?q=${str}&token=${token}`)
    hashedQueryResults[str] = queryResponse.data
    symbolMatch = hashedQueryResults[str]
  }

  if (!symbolMatch || !symbolMatch.count) {
    res.send({error: 'Query could not be resolved, try something else'})
  }

  try {
    finnhubClient.stockCandles(symbolMatch.result[0].symbol, "D", start, end, {}, (error, data, response) => {
      if (error) {
        res.send({error})
        return
      }
  
      res.send({
        data,
        targetCompany: symbolMatch.result[0].description,
        alternateSymbolsForQuery: symbolMatch.result,
      })
    })
  } catch (err) {
    res.send({err})
  }  
})

app.listen(4000, () => {
  console.log('Server is listening on 4000')
})