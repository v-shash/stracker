from redis import Redis
from os import getenv


def get_store_connection():
    redis_host = getenv("REDIS_HOST")
    if not redis_host:
        redis_host = "store"

    store_conn = Redis(host=redis_host)

    if not store_conn.ping():
        raise RuntimeError(
            "ping failed for redis store with host {0}".format(redis_host))

    return store_conn
