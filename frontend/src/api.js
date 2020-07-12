import axios from 'axios';

export const StrackerAPI = axios.create({
    baseURL: `http://localhost:8000`
});


export const GetStocks = async () => {
    const response = await StrackerAPI.get("/stocks/");
    return response
}

export const GetStockInfo = async (stockSymbol) => {
    const response = await StrackerAPI.get(`/stocks/${stockSymbol}/`);
    return response
}