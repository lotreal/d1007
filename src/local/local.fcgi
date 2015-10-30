#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, '/home/lot/www/d1007.com/lib/python/dist-packages');

projectName = 'wuhanx'
projectPath = '%s/%s/' % (os.path.abspath(os.path.dirname(__file__)), projectName)

os.chdir(projectPath)
os.environ["DJANGO_SETTINGS_MODULE"] = '%s.local_settings' % (projectName)

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
