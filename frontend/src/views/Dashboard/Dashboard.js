import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  StockVisualizer,
  FeatureToDo
} from './components';

import { GetStocks, GetStockInfo } from 'api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

// Price
// $Current price

// up / down since last week




// Volumes



// Highest
// Lowest


// Stock that grew the most

const Dashboard = () => {
  const classes = useStyles();

  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [stockList, setStockList] = useState([])
  const [loaded, setLoaded] = useState(false);

  // console.log(stockInfo)

  useEffect(() => {
    GetStocks().then(response => {
      setStockList(response.data);
      // console.log("Fetched stock data");
      setLoaded(true);
    })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })

  }, [])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <StockVisualizer loaded={loaded} stockList={stockList} selectedStocks={{ selectedStocks, setSelectedStocks }} stockInfo={{ stockInfo, setStockInfo }} />
        </Grid>
        {/* <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid> */}
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <FeatureToDo />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
