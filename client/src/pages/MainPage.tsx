import React, { useEffect, useState, Fragment } from 'react'
import { AxiosResponse } from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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
const moment = require('moment')

export default function MainPage() {
  const initialQueryValue = 'AAPL'
  const [startDate, setStartDate] = React.useState<Date | null>(
    moment().subtract(7, 'days').toDate()
  )
  const [endDate, setEndDate] = React.useState<Date | null>(
    moment().toDate()
  )
  const [shouldQuery, setShouldQuery] = useState(0)
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState('Loading...')
  const [alternateStocks, setAlternateStocks] = useState([] as IStockSymbolInformation[])
  const [query, setQuery] = useState(initialQueryValue)
  const [lastQueryValue, setLastQueryValue] = useState(initialQueryValue)
  const getStockInformation = async () => {
    setLoading(true)
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
  }
  useEffect(() => {
    getStockInformation()
  }, [shouldQuery]) // eslint-disable-line react-hooks/exhaustive-deps

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }),
  )
  const classes = useStyles()

  const stateWithData = () => {
    return (
      <div>
        <div>Showing data for {company}</div>
        <ChartWrapper data={chartData}></ChartWrapper>
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
    if (query?.length > 0 && lastQueryValue !== query) {
      setLastQueryValue(query)
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
    setLastQueryValue(query)
    setShouldQuery(shouldQuery + 1)
  }

  const alternateStockChips = () => {
    if (!alternateStocks?.length || Object.keys(alternateStocks[0]).length === 0) {
      return null
    }
    return (
      <Fragment>
        <span>Here are some similar stock symbols that matched your search</span>
        {
          alternateStocks.slice(0, 4).map(stock => {
            return <Chip label={stock.symbol} onClick={clickedAlternateStockSymbol(stock.symbol)} />
          })
        }
      </Fragment>
    )
  }

  const startDateChanged = (date: Date | null) => {
    setStartDate(date)
  }
  const endDateChanged = (date: Date | null) => {
    setEndDate(date)
  }

  const datepickerComponent = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-start"
            label="From"
            value={startDate}
            onChange={startDateChanged}
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
            value={endDate}
            onChange={endDateChanged}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }

  return (
    <div>
      <div>
        <div>
          <div className={classes.root}>
            <TextField
              id="outlined-basic"
              label="Stock or Company"
              variant="outlined"
              value={query}
              onKeyDown={handleEnterKey}
              onChange={handleQueryChange}
            />
            {datepickerComponent()}
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={checkIfWeNeedToQueryForNewData}
              >
              Let's go!
            </Button>
          </div>
        </div>
        <div>
          {loading && <CircularProgress />}
          {!loading && alternateStockChips()}
          {!loading && stateWithData()}
        </div>
      </div>
    </div>
  )
}