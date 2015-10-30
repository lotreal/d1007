#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.test import TestCase

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.contrib.auth.models import User, SiteProfileNotAvailable
from django.db import models

if not settings.AUTH_PROFILE_MODULE:
    raise SiteProfileNotAvailable
try:
    app_label, model_name = settings.AUTH_PROFILE_MODULE.split('.')
    Profile = models.get_model(app_label, model_name)
except (ImportError, ImproperlyConfigured):
    raise SiteProfileNotAvailable

if not Profile:
    raise SiteProfileNotAvailable

rpx_response_xml = """<?xml version='1.0' encoding='UTF-8'?>
<rsp stat='ok'>
  <profile>
    <displayName>
      lot.real
    </displayName>
    <email>
      lot.real@gmail.com
    </email>
    <identifier>
      https://www.google.com/accounts/o8/id?id=AItOawnGrCA3hhOS3NO0YrcFEMbgwyylcrWMZBI
    </identifier>
    <name>
      <givenName>
        luo
      </givenName>
      <familyName>
        tao
      </familyName>
      <formatted>
        luo tao
      </formatted>
    </name>
    <preferredUsername>
      lot.real
    </preferredUsername>
    <providerName>
      Google
    </providerName>
    <verifiedEmail>
      lot.real@gmail.com
    </verifiedEmail>
    <debug>
    </debug>
  </profile>
</rsp>
"""

douban_response_xml = """  <?xml version="1.0" encoding="UTF-8"?>
    <entry xmlns="http://www.w3.org/2005/Atom"
        xmlns:gd="http://schemas.google.com/g/2005"
        xmlns:opensearch="http://a9.com/-/spec/opensearchrss/1.0/"
        xmlns:db="http://www.douban.com/xmlns/">
        <db:location id="beijing">北京</db:location>
        <db:uid>ahbei</db:uid>
        <title>阿北</title>
        <content>
            豆瓣的临时总管。现在多数时间在忙忙碌碌地为豆瓣添砖加瓦。坐在马桶上看书，算是一天中最放松的时间。
    
    
            我不但喜欢读书、旅行和音乐电影，还曾经是一个乐此不疲的实践者，有一墙碟、两墙书、三大洲的车船票为记。现在自己游荡差不多够了，开始懂得分享和回馈。豆瓣是一个开始，希望它对你同样有用。
        </content>
        <link rel="self" href="http://api.douban.com/people/ahbei" />
        <link rel="alternate" href="http://www.douban.com/people/ahbei/" />
        <link rel="icon" href="http://www.google.com/images/nav_logo6.png" />
    
        <link rel="homepage" href="http://ahbei.com/" />
        <id>http://api.douban.com/people/ahbei</id>
    </entry>"""

class SimpleTest(TestCase):
    def test_import(self):
        from oauth import client
        print client.TEST
        print client.oauth

    def test_oauth_dict(self):
        from wuhanx.account import oauth_response_to_profile_dict as oauth_dict
        from wuhanx.account import oauth_response_to_profile as oauth_profile

        from elementtree import ElementTree
        from elementtree.ElementTree import Element, SubElement, dump, tostring

        parser = ElementTree.XMLParser(encoding="utf-8")
        xml = ElementTree.fromstring(rpx_response_xml, parser=parser)

        xml.find('.//email').text = 'lot.real@gmail.com'
        self.assertEquals(oauth_dict('rpx', tostring(xml))['email'], 'lot.real@gmail.com')

        xml.find('.//email').text = ''
        xml.find('.//verifiedEmail').text = ''
        self.assertEquals(oauth_dict('rpx', tostring(xml))['email'], '')

        xml.find('.//email').text = None
        self.assertEquals(oauth_dict('rpx', tostring(xml))['email'], '')

        rp = oauth_dict('rpx', rpx_response_xml)
        uuid = rp['id']
        self.assertEquals(uuid, 'https://www.google.com/accounts/o8/id?id=AItOawnGrCA3hhOS3NO0YrcFEMbgwyylcrWMZBI')
        print rp

        dp = oauth_dict('douban', douban_response_xml)
        print dp
        self.assertEquals(dp['id'], 'http://api.douban.com/people/ahbei')

        p1 = oauth_profile('rpx', rpx_response_xml)
        p2 = oauth_profile('douban', douban_response_xml)
        

__test__ = {"doctest": """
Another way to test that 1 + 1 is equal to 2.

>>> 1 + 1 == 2
True
"""}

