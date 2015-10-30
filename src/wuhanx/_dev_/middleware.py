# -*- coding: utf-8 -*-
class RequestViewerMiddleware(object):
    def process_response(self, request, response):
        """debug"""
        return response
