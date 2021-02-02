/*
  Idea: Use this service as a wrapper over the finnhub client provided
  Reasons:
  1. api calls/minute limitation of free API (we are going to cache results)
  2. using / initializing client in multiple places might not be ideal
  3. easier function calls and less processing outside of this wrapper
  4. I'm sure there are many more reasons why this makes sense.
*/
export default class StockClient {
  static clientRef: StockClient
  static getClient() {
    if (!StockClient.clientRef) {
      return new StockClient()
    }
    return StockClient.clientRef
  }
  private finnhubClient
  private timeoutRef
  private lastRequestTimeStamp = 0
  private promisesHash: {[k:string]:Promise<any>} = {}

  constructor() {
    if (StockClient.clientRef) {
      throw new Error('Can\'t manually instantiate class. Please call static getClient() method, instead')
    }
    StockClient.clientRef = this
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "sandbox_c0c37sn48v6o915a17h0" // Maybe i'll move this on a nodejs server, maybe
    this.finnhubClient = new finnhub.DefaultApi()
  }

  getStockSymbols() {
    // const lastUpdatedAt = window.localStorage.getItem('stockSymbolsUpdatedAt')
    // if (lastUpdatedAt) {
    //   // older than 10 minutes
    //   if (Date.now() - +lastUpdatedAt > 10 * 60 * 1000) {

    //   }
    // }
    // this.finnhubClient.stockSymbols("US", (error, data, response) => {
    //   console.log(data)
    // })
    // console.log('get stockz', symbols)
  }

  getCompanies() {
    console.log('get compz')
  }

  // maybe cache this str
  searchForSymbolOrCompany(str: string) {
    const resolve = (data) => data
    if (!this.promisesHash.symbol) {
      this.promisesHash.symbol = new Promise(resolve)
    }
    clearTimeout(this.timeoutRef)
    const timeSinceLastRequest = Date.now() - this.lastRequestTimeStamp
    if (timeSinceLastRequest < 1000) {
      this.timeoutRef = setTimeout(() => {
        this.callForStock(str, resolve)
      }, timeSinceLastRequest)
    } else {
      this.callForStock(str, resolve)
    }

    return this.promisesHash.symbol
  }

  private callForStock(str, resolve) {
    this.lastRequestTimeStamp = Date.now()
    this.finnhubClient.stockTick(str, "2020-03-25", 100, 0, (error, data, response) => {
      console.log(data)
      resolve(data)
    })
  }
}