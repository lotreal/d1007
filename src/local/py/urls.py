from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^$', 'py.views.index'),
    (r'^hello/', include('py.hello.urls')),
)
