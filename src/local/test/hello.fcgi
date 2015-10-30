#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, os

projectName = 'py'
pathAdd = os.path.dirname(os.path.abspath(__file__))
projectPath = pathAdd + '/%s/' % (projectName)

sys.path.insert(0, '/home/virtualhost/ld1007co/lib/python/dist-packages');

os.chdir(projectPath)

os.environ["DJANGO_SETTINGS_MODULE"] = '%s.settings' % (projectName)

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
