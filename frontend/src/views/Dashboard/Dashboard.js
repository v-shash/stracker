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
      .catch(() => {
        console.log("Error fetching data");
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
