#!/usr/bin/python
# -*- coding: utf-8 -*-
from django.utils.translation import ugettext_lazy as _
from django.conf.urls.defaults import *
from django.contrib import admin
from django.conf import settings
from django.views.generic.simple import direct_to_template
from django.views.generic.simple import redirect_to
from userprofile.views import get_profiles
from iluo import views

admin.autodiscover()

urlpatterns = patterns('',
    url( r'^$', direct_to_template, { 'template': 'index.html', 'extra_context': { 
                'page_name': _('Home'), 'body_attribute':' class=homepage' } }, name='site-home' ),

    url( r'^store/$', direct_to_template, { 'template': 'store.html', 'extra_context': {
                'page_name': _('Store'), 'body_attribute':' class=store' } }, name='store-home' ),

    url( r'^decency/$', direct_to_template, { 'template': 'decency.html', 'extra_context': { 
                'page_name': _('Decency'), 'body_attribute':' class=product' } }, name='decency-home' ),

    url( r'^club/$', direct_to_template, { 'template': 'club.html', 'extra_context': { 
                'page_name': _('Club'), 'body_attribute':' class=club' } }, name='club-home' ),

    url( r'^kb/$', direct_to_template, { 'template': 'kb.html', 'extra_context': { 
                'page_name': _('Wiki'), 'body_attribute':' class=kb' } }, name='kb-home' ),

    url( r'^kb/(?P<title>\S+)/$', views.kb, name='kb' ),

    url( r'^support/$', direct_to_template, { 'template': 'support.html', 'extra_context': { 
                'page_name': _('Support'), 'body_attribute':' class=support' } }, name='support-home' ),

    url( r'^sitemap/$', direct_to_template, { 'template': 'sitemap.html', 'extra_context':{ 'page_name': _('Site Map') } }, name='site-map' ),
    url( r'^i18n/', include('django.conf.urls.i18n') ),

#     (r'^wm/', include('wuhanx.wm.urls')),
#     (r'^voting/', include('wuhanx.voting.urls')),
#     (r'^passport/', include('wuhanx.passport.urls')),

    #(r'^avatar/', include('wuhanx.avatar.urls')),

    # (r'^dz/', include('wuhanx.dz.urls')),
#     (r'^dz/', 'wuhanx.web.views.dz'),
#     (r'^buy/', 'wuhanx.web.views.buy'),
#     (r'^cooperation/', 'wuhanx.web.views.cooperation'),
#     (r'^bbs/', 'wuhanx.web.views.bbs'),
#     (r'^service/', 'wuhanx.web.views.service'),

#     (r'^cookie/wiki-skin-html/', 'wuhanx.cookie.wiki.skin_html'),
#     (r'^cookie/wiki-skin-class/', 'wuhanx.cookie.wiki.skin_class'),


#     (r'^osc/index/',    'wuhanx.osc.index'),
#     (r'^osc/contents/', 'wuhanx.osc.contents'),

    # Demo FrontPage$
    #(r'^front/$', direct_to_template, {'extra_context': { 'profiles': get_profiles }, 'template': 'front.html' }),

    url( r'^', include('iluo.tweet.urls') ),

    # Profile application
    url( r'^accounts/', include('userprofile.urls') ),
    url( r'^accounts/login/rpx/$', 'iluo.auth.views.login_by_rpx', name='login-rpx' ),
    url( r'^accounts/login/douban/$', 'iluo.auth.views.login_by_douban', name='login-douban' ),
    url( r'^accounts/login/douban/request/$', 'iluo.auth.views.request_douban_auth', name='request-douban' ),


    # Uncomment the next line to enable the admin:
    url( r'^admin/(.*)', admin.site.root ),
    # Uncomment the admin/doc line below and add 'django.contrib.admindocs'
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url( r'^_dev_/', include('wuhanx._dev_.urls') ),
)

if settings.DEBUG and settings.USE_RUNSERVER:
    urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
    )
