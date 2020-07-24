import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Grid,
  Chip
} from '@material-ui/core';

import {
  Autocomplete
} from '@material-ui/lab'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { StockChart } from './chart';
import { GetStockInfo } from 'api';


const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 550,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));




const StockVisualizer = props => {
  const { className, stockList, selectedStocks, stockInfo, loaded, ...rest } = props;
  const [chartData, setChartData] = useState([])
  var CardAction = ''
  const [initDone, setInitDone] = useState(false)

  const classes = useStyles();

  // const handleStockInputChange = (event, value, reason) => {
  //   console.log("Handling change");
  //   switch (reason) {
  //     case 'input':
  //       console.log("input")
  //       break;
  //     case 'reset':
  //       console.log("reset")
  //       break;
  //     case 'clear':
  //       console.log("clear")
  //       break;
  //   }
  // }



  const processChartData = (newSelectedStocks) => {
    let temp = []
    for (const stock of newSelectedStocks) {
      const keys = Object.keys(stockInfo.stockInfo[stock.symbol].data);
      console.log(stockInfo.stockInfo);
      let tempChartData = {};
      tempChartData.data = [];
      tempChartData.id = stockInfo.stockInfo[stock.symbol].symbol;
      for (const key of keys) {
        const dataPoint = {
          x: key.slice(0, 19),
          y: stockInfo.stockInfo[stock.symbol].data[key].close.toPrecision(5)
        }
        tempChartData.data.push(dataPoint)
      }
      temp.push(tempChartData);
    }

    setChartData(temp);
  }

  const handleFetchingNewStocks = async (newSelectedStocks) => {

    let tempInfo = stockInfo.stockInfo;
    for (const stock of newSelectedStocks) {
      if (!(stock.symbol in tempInfo)) {
        console.log(`Fetching ${stock.symbol} data`);
        tempInfo[stock.symbol] = await (await GetStockInfo(stock.symbol)).data;
        console.log(`Successfully fetched ${stock.symbol}`);

        // GetStockInfo(stock.symbol).then(response => {
        //   tempInfo[stock.symbol] = response.data;
        //   console.log("Successfully fetched");
        // })
      }
    }

    await stockInfo.setStockInfo(tempInfo);

  }

  const handleStockChange = async (event, value, reason) => {
    console.log("Handling change");
    console.log(value)
    // switch (reason) {
    //   case 'create-option':
    //     console.log("Create option")
    //     break;
    //   case 'select-option':
    //     console.log("Select option")

    //     break;
    //   case 'remove-option':
    //     console.log("Remove option")
    //     break;
    //   case 'blur':
    //     console.log("blur")
    //     break;
    //   case 'clear':
    //     console.log("clear")
    //     break;

    // }
    selectedStocks.setSelectedStocks(value);
    await handleFetchingNewStocks(value);
    processChartData(value);

  }

  const handleChartDataInitialization = async (initValue) => {
    await handleFetchingNewStocks(initValue);
    await processChartData(initValue);
    setInitDone(true);
  }

  useEffect(() => {
    if (loaded) {
      if (!initDone) {
        handleChartDataInitialization([stockList[0]]);
      }
    }

  }, [props])

  console.log(loaded);

  if (loaded) {
    /// initialize
    // selectedStocks.setSelectedStocks([stockList[0]]);
    CardAction = <Autocomplete
      multiple
      limitTags={3}
      id="stock-selector"
      onChange={handleStockChange}
      autoComplete
      options={stockList}
      defaultValue={[stockList[0]]}
      getOptionLabel={(option) => `${option.symbol}: ${option.name}`}
      size="small"
      style={{ width: 350 }}
      // fullWidth
      renderInput={(params) => <TextField {...params} label="Select a Stock" variant="outlined" placeholder="Add stock" />}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" size="small" label={option.symbol} {...getTagProps({ index })} />
        ))
      }
    />;
  }
  else {
    CardAction = '';
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardHeader
        action={CardAction}
        title="Stock Price Tracker"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <StockChart data={chartData} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          disabled
        >
          Last 7 days | updated daily
           {/* <ArrowRightIcon /> */}
        </Button>
      </CardActions>
    </Card>
  );
};

StockVisualizer.propTypes = {
  className: PropTypes.string,
  stockList: PropTypes.array,
  selectedStocks: PropTypes.object,
  stockInfo: PropTypes.object,
  loaded: PropTypes.bool,
};

export default StockVisualizer;
