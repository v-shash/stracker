from __future__ import absolute_import, unicode_literals

from celery_app import app

from stock_list_fetcher import fetch_stock_list
from stock_price_fetcher import fetch_stock_prices

from celery.schedules import crontab
from celery.task import periodic_task


@app.task
def StockListFetcher():
    fetch_stock_list()


@app.task
def StockInfoFetcher():
    fetch_stock_prices()


@periodic_task(run_every=crontab(minute=15, hour="*/2"))
def PeriodicStockFetcher():
    fetch_stock_list()
    fetch_stock_prices()
