from settings import *
import os

DEBUG = True
TEMPLATE_DEBUG = DEBUG
USE_RUNSERVER = False
INTERNAL_IPS = ('192.168.0.22')
LOGGING_OUTPUT_ENABLED = True
LOGGING_LOG_SQL = True


DATABASE_NAME = 'ld1007co_wuhanx'             # Or path to database file if using sqlite3.
DATABASE_USER = 'luotao'             # Not used with sqlite3.
DATABASE_PASSWORD = '521198'         # Not used with sqlite3.


CACHE_BACKEND = 'file:///home/lot/www/d1007.com/cache'
CACHE_MIDDLEWARE_SECONDS = 60

HOME_URL            = 'http://www.local-d1007.com'
BASE_WIKI           = 'http://wiki.local-d1007.com'
MEDIA_URL           = 'http://static.local-d1007.com/'
ADMIN_MEDIA_PREFIX  = '%sadmin/' % MEDIA_URL
MEDIA_ROOT          = '/home/lot/www/d1007.com/public_html/static/'

TWEET_HOST = 't.local-d1007.com'
TWEET_API = '/api'
TWEET_URL = 'http://%s' % TWEET_HOST

FETCH_CACHE_SECONDS = 600
FETCH_SOURCE = {
    'wiki':        { 'home': BASE_WIKI },
    'wikipedia':   { 'home': 'http://zh.wikipedia.org/w' },
    }


MIDDLEWARE_CLASSES += (
    'djangologging.middleware.LoggingMiddleware',
    'djangologging.middleware.SuppressLoggingOnAjaxRequestsMiddleware',
    )


# mediawiki skin generator
MEDIAWIKI_SKIN_FILE = '%s/skins/wuhanx/wuhanx.wikiskin.php' % MEDIA_ROOT


DEFAULT_AVATAR = os.path.join(MEDIA_ROOT, 'userprofile/generic.jpg')

import logging
import logging.handlers

logger = logging.getLogger()
LOG_FILENAME = '/home/lot/www/d1007.com/logs/wuhanx.log'
file_handler = logging.handlers.RotatingFileHandler(
              LOG_FILENAME, maxBytes=1024 * 1024, backupCount=5)
# console handler
# logging.StreamHandler()
file_handler.setLevel(logging.DEBUG)
# create formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# add formatter to ch
file_handler.setFormatter(formatter)
# add ch to logger
logger.addHandler(file_handler)
