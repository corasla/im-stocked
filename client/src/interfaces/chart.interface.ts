export interface ICandleDataInformation {
  l: number[]   //low
  h: number[]   //high
  t: number[]   //timestamp
  s: string     //status
  c?: number[]  //close
  o?: number[]  //open
  v?: number[]  //volume
}

export interface IStockSymbolInformation {
  symbol: string
  description?: string
  displaySymbol?: string
  type?: string
}

export interface IStockInformation {
  data: ICandleDataInformation
  alternateSymbolsForQuery: IStockSymbolInformation[]
  targetCompany: string
}