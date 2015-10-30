#!/usr/bin/python
# -*- coding: utf-8 -*-
from django.template.loader import render_to_string
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.conf import settings
from djangologging.decorators import suppress_logging_output
from iluo.http import raiseException, showMessage
from django.core.urlresolvers import reverse

def mediawiki_skin (request):
    ret = render_to_string('_dev_/mediawiki_skin.html')
    f = open(settings.MEDIAWIKI_SKIN_FILE, 'w')
    f.write(ret.encode('utf-8'))
    f.close()
    #response = HttpResponse('OK!')
#     response = HttpResponse(mimetype='text')
#     response['Content-Disposition'] = 'attachment; filename=%s' % 'wuhanx.wikiskin.php'
#     response.write(ret)
    ci=RequestContext(request)
    return showMessage(request, 'Template has been successfully generated.')

def test_raiseException(request):
    try:
        raise Exception('test ok')
    except Exception, e:
        return raiseException(request, e)

def sandbox (request):
    from django.http import HttpResponse, HttpResponseNotFound, Http404
    raise Http404
    return HttpResponse(status=201)
    return HttpResponseNotFound('<h1>Page not found</h1>')
