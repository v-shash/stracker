# from wget import download
from pandas import read_csv
from os.path import exists
from os import remove
import pickle
from store import get_store_connection
import requests


def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter below
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                f.write(chunk)
    return local_filename


def fetch_stock_list():
    store_conn = get_store_connection()

    stock_list_file = './nasdaqlisted.txt'

    if not exists('./nasdaqlisted.txt'):
        download_file(
            "http://ftp.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt")

    data = read_csv(stock_list_file, sep="|", header=0)
    # data is a tuple
    # ('Symbol', 'Security Name', 'Market Category', 'Test Issue',
    #  'Financial Status', 'Round Lot Size', 'ETF', 'NextShares')

    stock_list = {}

    id = 1

    for stock in data.values[:-1]:
        if stock[0] not in stock_list:
            stock_list[stock[0]] = {}
        stock_list[stock[0]]['Name'] = stock[1]
        stock_list[stock[0]]['Id'] = id
        id += 1

    # move old stock list to stock_list_backup
    old_stock_list = store_conn.get("stock_list")
    if old_stock_list:
        # will be saved as a byte array. No need to deserialize it
        store_conn.set("stock_list_backup", old_stock_list)

    store_conn.set("stock_list", pickle.dumps(stock_list))

    remove(stock_list_file)


if __name__ == '__main__':
    fetch_stock_list()