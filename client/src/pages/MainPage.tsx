import React, { useEffect, useState, Fragment } from 'react'
import { AxiosResponse } from 'axios'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import stocksClientService from '../services/stocksClientService'
import { IStockInformation, IStockSymbolInformation } from '../interfaces'
import ChartWrapper from '../components/ChartWrapper'

import './MainPage.scss'

const moment = require('moment')

export default function MainPage() {
  const initialQueryValue = 'AAPL'
  const [startDate, setStartDate] = useState<Date | null>(
    moment().subtract(7, 'days').toDate()
  )
  const [endDate, setEndDate] = useState<Date | null>(
    moment().toDate()
  )
  const [showPlottedMedian, setShowPlottedMedian] = useState(true)
  const [shouldQuery, setShouldQuery] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [minDate, setMinDate] = useState(moment().subtract(7, 'days').toDate())
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState('Loading...')
  const [alternateStocks, setAlternateStocks] = useState([] as IStockSymbolInformation[])
  const [query, setQuery] = useState(initialQueryValue)
  const [lastQueryValue, setLastQueryValue] = useState(initialQueryValue)
  const getStockInformation = async () => {
    setLoading(true)
    setError(null)
    try {
      const stockInformation: AxiosResponse<IStockInformation> = await stocksClientService.getStockInformationFor(query, startDate, endDate)
      const {
        data,
        targetCompany,
        alternateSymbolsForQuery
      } = stockInformation.data
      setCompany(targetCompany)
      setLoading(false)
      setAlternateStocks(alternateSymbolsForQuery)
      setChartData(data)
    } catch(error) {
      setError('Error loading data. Please try again.')
      setLoading(false)
      setLastQueryValue('')
    }
  }
  useEffect(() => {
    getStockInformation()
  }, [shouldQuery]) // eslint-disable-line react-hooks/exhaustive-deps

  const stateWithData = () => {
    return (
      <div>
        <h3>Showing data for {company}</h3>
        <ChartWrapper data={chartData} showMedian={showPlottedMedian}></ChartWrapper>
      </div>
    )
  }

  const handleQueryChange = (event) => {
    const {
      value
    } = event.currentTarget
    setQuery(value.trim())
  }

  const checkIfWeNeedToQueryForNewData = () => {
    if (query?.length > 0 && lastQueryValue !== `${query}${startDate}${endDate}`) {
      setLastQueryValue(`${query}${startDate}${endDate}`)
      setShouldQuery(shouldQuery + 1)
    }
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      checkIfWeNeedToQueryForNewData()
    }
  }

  const clickedAlternateStockSymbol = (symbol) => () => {
    setQuery(symbol)
    setLastQueryValue(`${query}${startDate}${endDate}`)
    setShouldQuery(shouldQuery + 1)
  }

  const alternateStockChips = () => {
    if (!alternateStocks?.length || Object.keys(alternateStocks[0]).length === 0) {
      return null
    }
    return (
      <div className="text-and-chips-yum">
        <h3>You may explore other stock symbols that matched your search by clicking them</h3>
        <div className="chips-bowl">
          {
            alternateStocks.slice(1, 5).map(stock => {
              return <Chip className="chip-item" key={stock.symbol} label={stock.symbol} onClick={clickedAlternateStockSymbol(stock.symbol)} />
            })
          }
        </div>
      </div>
    )
  }

  const startDateChanged = (date: Date | null) => {
    if (!date || isNaN(date as any)) {
      return
    }
    let newDate = date
    setStartDate(newDate)
  }
  const endDateChanged = (date: Date | null) => {
    if (!date || isNaN(date as any)) {
      return
    }
    let newDate = date
    setMinDate(moment(newDate).subtract(7, 'days').toDate())
    if (moment(newDate).diff(moment(startDate), 'days') < 6) {
      setStartDate(moment(newDate).subtract(7, 'days'))
    }
    setEndDate(newDate)
  }

  const datepickerComponent = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around"
          className="datepicker-containers actionable-item-container">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-start"
            label="From"
            className="datepicker"
            value={startDate}
            autoOk={true}
            maxDate={minDate}
            onChange={startDateChanged}
            disableFuture={true}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-end"
            label="To"
            className="datepicker"
            value={endDate}
            onChange={endDateChanged}
            disableFuture={true}
            autoOk={true}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }

  const loadingProgressState = () => {
    return (
      <div className="loading-wrapper">
        <span>Loading data...</span>
        <CircularProgress />
      </div>
    )
  }

  const showPlottedMedianChanged = (event) => {
    setShowPlottedMedian(event.target.checked)
  }

  return (
    <div className="MainPage">
      <div className="main-wrapper">
        <div className="options-wrapper">
          <div className="options-container">
            <TextField
              id="outlined-basic"
              label="Stock or Company"
              variant="outlined"
              className="actionable-item-container textfield"
              value={query}
              onKeyDown={handleEnterKey}
              onChange={handleQueryChange}
            />
            {datepickerComponent()}
            
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              className="actionable-item-container button"
              onClick={checkIfWeNeedToQueryForNewData}
              >
              Let's go!
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                    checked={showPlottedMedian}
                    onChange={showPlottedMedianChanged}
                    inputProps={{ 'aria-label': 'show plotted median' }}
                  />
              }
              label="Show Median Line"
            />
          </div>
        </div>
        {
          !error && <div className="info-and-chart-wrapper">
            {loading && loadingProgressState()}
            {!loading && <div style={{color:'#f33'}}>Note! We are only displaying MOCK data from finnhub client with sandbox API_KEY. Real data does not work for all stock types and queries on the FREE plan</div>}
            {!loading && alternateStockChips()}
            {!loading && stateWithData()}
          </div>
        }
        {
          error && <span>{error}</span>
        }
      </div>
    </div>
  )
}