import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import ChartWrapper from '../components/ChartWrapper'

export default function MainPage() {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }),
  )
  const classes = useStyles();
  return (
    <div>
      <header>omg</header>
      <div>
        <div>
          <div className={classes.root}>
            <Button variant="contained" color="primary">
              Somethin
            </Button>
          </div>
        </div>
        <div>
          <ChartWrapper></ChartWrapper>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  )
}