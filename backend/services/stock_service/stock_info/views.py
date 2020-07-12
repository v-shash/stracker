from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status

from django.core.cache import cache


class ListStocks(ViewSet):
    """
    View to list all stocks

    """
    def list(self, request, format=None):
        """
        Return a list of all available stocks
        """
        valid_stocks = cache.get("valid_stock_list")
        return Response(valid_stocks)

    def retrieve(self, request, pk, format=None):
        if not cache.has_key(pk):
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(cache.get(pk))
