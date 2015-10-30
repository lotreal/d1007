#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, os

sys.path.insert(0, '/home/virtualhost/ld1007co/lib/python/dist-packages')
sys.path.insert(0,'/home/virtualhost/ld1007co/d1007.com/public_html')

projectName = 'wuhanx'
projectPath = '%s/%s/' % (os.path.abspath(os.path.dirname(__file__)), projectName)

os.chdir(projectPath)
os.environ["DJANGO_SETTINGS_MODULE"] = '%s.londit_settings' % (projectName)

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
