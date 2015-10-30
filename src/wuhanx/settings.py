#!/usr/bin/python
# -*- coding: utf-8 -*-
#from django.utils.translation import ugettext_lazy as _
import os

SITE_ID        = 1
VERSION        = 1.2
DEBUG          = False
USE_RUNSERVER  = False
TEMPLATE_DEBUG = DEBUG
PROJECT_PATH   = os.path.abspath(os.path.dirname(__file__))


ADMINS = (
    ('lotreal', 'lotrea@163.com'),
)
MANAGERS = ADMINS


DATABASE_ENGINE = 'mysql'           # 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
DATABASE_NAME = 'wuhanx'             # Or path to database file if using sqlite3.
DATABASE_USER = 'luotao'             # Not used with sqlite3.
DATABASE_PASSWORD = '521198'         # Not used with sqlite3.
DATABASE_HOST = ''             # Set to empty string for localhost. Not used with sqlite3.
DATABASE_PORT = ''             # Set to empty string for default. Not used with sqlite3.


# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'Asia/Hong_Kong'


# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True
# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
# LANGUAGE_CODE = 'zh-cn'
LANGUAGES = (
    ('en',    'English'),
    ('zh-cn', '简体中文'.decode('utf-8')),
    ('zh-tw', '繁體中文'.decode('utf-8')),
)


AUTH_PROFILE_MODULE = 'account.profile'
# Make this unique, and don't share it with anybody.
SECRET_KEY = 'mjytiu!j*5g%auo!r_x%hf&2qu8dvy&jv3v50i-9zptz4cl3m8'
# LOGIN_URL = '/passport/'


#CACHE_BACKEND = 'dummy:///'


MIDDLEWARE_CLASSES = (
    'iluo.tweet.sync.SyncProfileMiddleware',
    # 'django.middleware.gzip.GZipMiddleware',
    # 'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'wuhanx.passport.middleware.PassportMiddleware',
    #'django.middleware.doc.XViewMiddleware',
    'django.middleware.locale.LocaleMiddleware',
)


ROOT_URLCONF = 'wuhanx.urls'
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.admin',
    'django_extensions',
#    'tagging',
    'iluo',
    'iluo.source',
    'iluo.tweet',

    'userprofile',
    'wuhanx.account',
    'wuhanx._dev_',
#     'wuhanx.role',
#     'wuhanx.cms',
#     'wuhanx.wm',
#     'wuhanx.voting',
#     'wuhanx.passport',
#     'wuhanx.cookie',
)


# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.load_template_source',
    'django.template.loaders.app_directories.load_template_source',
#     'django.template.loaders.eggs.load_template_source',
)
TEMPLATE_DIRS = (
    os.path.join(PROJECT_PATH, 'templates'),
)
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    "django.core.context_processors.request",
    "wuhanx.context_processors.site",
)


# 60*60*24*365*10
SESSION_COOKIE_AGE = 315360000


# START of django-profile specific options
I18N_URLS = False
#DEFAULT_AVATAR = os.path.join(MEDIA_ROOT, 'userprofile/generic.jpg')
AVATAR_WEBSEARCH = True
# 127.0.0.1:8000 Google Maps API Key
GOOGLE_MAPS_API_KEY = "ABQIAAAAF95lA65id7haywozxc4PfBQZ-AfskKAAG7PfVXIIXGdcNFbVnhR-BpbANQMw9nRmoIyZTZ8K3ZnYRA"
# Haddock
#GOOGLE_MAPS_API_KEY="ABQIAAAA06IJoYHDPFMx4u3hTtaghxS1mGAeXhF8eEwoOC3WUqD9xSVHbhT_wvgbriWemZzoPwFT5-HqnLJ9-A"
REQUIRE_EMAIL_CONFIRMATION = False
AVATAR_QUOTA = 2

# Uncomment and fill the field above to activate GEOIP
#GEOIP_PATH = "%s/db/" % PROJECT_PATH

# Uncomment and fill the fields above to activa the S3 Storage backend
# S3 Storage Settings
#AWS_SECRET_ACCESS_KEY = ""
#AWS_ACCESS_KEY_ID = ""
#AWS_STORAGE_BUCKET_NAME = "avatar-test"
#from S3 import CallingFormat
#AWS_CALLING_FORMAT = CallingFormat.SUBDOMAIN
# END of django-profile specific options
