import axios, { AxiosResponse } from "axios"
import {
  IStockInformation
} from '../interfaces'
const moment = require('moment')

const getStockInformationFor = async (companyOrStockString: string, startDate: Date | null, endDate: Date | null): Promise<AxiosResponse<IStockInformation>> => {
  return axios.get(`http://localhost:4000/stock_data?str=${companyOrStockString}&start=${moment(startDate).unix()}&end=${moment(endDate).unix()}`)
}

export default {
  getStockInformationFor,
}