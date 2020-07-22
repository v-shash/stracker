from store import get_store_connection
import yfinance as yf
import pickle
import functools
import time
# from multiprocessing.pool import ThreadPool
# from multiprocessing import Pool
from billiard import Pool

store_conn = get_store_connection()

valid_data = []

stock_list = []


def store_stock_info(stock):
    global store_conn
    d = {}
    d[stock['symbol']] = {}
    for time_slot in valid_data.index.to_list():
        parsed_time = time_slot.strftime('%Y-%m-%d %X%z')
        if "data" not in d[stock['symbol']]:
            d[stock['symbol']]["data"] = {}
        if parsed_time not in d[stock['symbol']]['data']:
            d[stock['symbol']]['data'][parsed_time] = {}
        d[stock['symbol']]['name'] = stock_list[stock['symbol']]['Name']
        d[stock['symbol']]['id'] = stock_list[stock['symbol']]['Id']
        d[stock['symbol']]['symbol'] = stock['symbol']
        d[stock['symbol']]['data'][parsed_time]['low'] = valid_data['Low'][
            stock['symbol']][time_slot]
        d[stock['symbol']]['data'][parsed_time]['high'] = valid_data['High'][
            stock['symbol']][time_slot]
        d[stock['symbol']]['data'][parsed_time]['open'] = valid_data['Open'][
            stock['symbol']][time_slot]
        d[stock['symbol']]['data'][parsed_time]['close'] = valid_data['Close'][
            stock['symbol']][time_slot]
        d[stock['symbol']]['data'][parsed_time]['volume'] = valid_data[
            'Volume'][stock['symbol']][time_slot]
    print("*** Storing {0} info".format(stock['symbol']))
    store_conn.set(stock['symbol'], pickle.dumps(d[stock['symbol']]))


def fetch_stock_prices():
    global store_conn
    global valid_data
    global stock_list

    stock_list_de = store_conn.get("stock_list")
    if not stock_list_de:
        stock_list_de = store_conn.get("stock_list_backup")

    stock_list = pickle.loads(stock_list_de)

    ticker_query = " ".join(list(stock_list.keys()))

    downloaded_stock_prices = yf.download(tickers=ticker_query,
                                          interval="30m",
                                          period="7d")

    valid_data = downloaded_stock_prices.dropna(axis=1)

    # valid_stock_list = {}
    valid_stock_list = []
    for key in valid_data.Low.keys().to_list():
        # if key not in valid_stock_list:
        #     valid_stock_list[key] = {}
        # valid_stock_list[key]['name'] = stock_list[key]['Name']
        # valid_stock_list[key]['id'] = stock_list[key]['Id']
        d = {}
        d['name'] = stock_list[key]['Name']
        d['id'] = stock_list[key]['Id']
        d['symbol'] = key
        valid_stock_list.append(d)

    # move old stock list to stock_list_backup
    old_valid_stock_list = store_conn.get("valid_stock_list")
    if old_valid_stock_list:
        # will be saved as a byte array. No need to deserialize it
        store_conn.set("valid_stock_list_backup", old_valid_stock_list)

    store_conn.set("valid_stock_list", pickle.dumps(valid_stock_list))

    # pool = ThreadPool(20)
    pool = Pool(1)

    # # initialize dictionary with keys
    pool.map(store_stock_info, valid_stock_list)

    # DEPRECATED
    # process_list = []
    # for stock in valid_stock_list:
    #     process_list.append(
    #         Process(target=store_stock_info,
    #                 args=(valid_data, store_conn, stock)))
    # for job in process_list:
    #     job.start()

    # for job in process_list:
    #     job.join()


if __name__ == '__main__':
    fetch_stock_prices()
