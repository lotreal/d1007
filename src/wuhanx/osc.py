# -*- coding: utf-8 -*-
from wuhanx.web import http
from django.http import HttpResponse
from django.conf import settings
from djangologging.decorators import suppress_logging_output

template_params = {
    'pagename': '知识库',
    'globalheader_on': 'on-V',
    'show_sidebar': False,
    'body_class': 'min',
    }


def index (request):
    from django.core.cache import cache
    import pdb
    values = template_params
    return http.respond(request, 'osc/index.html', values)

@suppress_logging_output
def contents (request):
    values = template_params
    return http.respond(request, 'osc/contents.html', values)

