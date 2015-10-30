from django.utils.translation import ugettext_lazy as _

from django.conf.urls.defaults import *

from django.views.generic.simple import direct_to_template
from wuhanx._dev_ import views

urlpatterns = patterns('',
    url( r'^$', direct_to_template, { 'template': '_dev_/index.html', 'extra_context':{ 'page_name': _('Development') } }, name='dev-home' ),
    url( r'^test-sandbox/$', views.sandbox, name='dev-sandbox' ),

    # url( r'^douban_oauth/$', douban.douban_oauth, name='douban-oauth' ),
    # url( r'^douban_user_info/$', douban.douban_user_info, name='douban-user-info' ),
    # url( r'^use_saved_access_token/$', douban.use_saved_access_token, name='use-saved-access-token' ),

    url( r'^fetch_mediawiki/$', direct_to_template, { 'template': '_dev_/fetch_mediawiki.html' }, name='dev-fetch-mediawiki' ),

    url( r'^css_sandbox/$', direct_to_template, { 'template': '_dev_/css_sandbox.html' }, name='css-sandbox' ),

    url( r'^mediawiki-skin/$', views.mediawiki_skin, name='mediawiki-skin' ),
    url( r'^mediawiki-skin-demo/$', direct_to_template, { 'template': '_dev_/mediawiki_skin_demo.html', 'extra_context':{ 'page_name': _('Wiki') } }, name='mediawiki-skin-demo' ),

    url( r'^test-raise-exception/$', views.test_raiseException ),
)
