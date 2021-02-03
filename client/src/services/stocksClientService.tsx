import axios, { AxiosResponse } from "axios"
import {
  IStockInformation
} from '../interfaces'
const moment = require('moment')

const getStockInformationFor = (companyOrStockString: string, startDate: Date | null, endDate: Date | null): Promise<AxiosResponse<IStockInformation>> => {
  const formattedStartDate = moment(startDate).unix()
  const formattedEndDate = moment(endDate).unix()
  const url = `http://localhost:4000/stock_data?str=${companyOrStockString}&start=${formattedStartDate}&end=${formattedEndDate}`
  return axios.get(url)
}

const moduleData = {
  getStockInformationFor,
}

export default moduleData