from settings import *
import os

DEBUG = False
TEMPLATE_DEBUG = DEBUG
USE_RUNSERVER = False
INTERNAL_IPS = ('219.140.211.131')
LOGGING_OUTPUT_ENABLED = True
LOGGING_LOG_SQL = True


DATABASE_NAME = 'ld1007co_wuhanx'             # Or path to database file if using sqlite3.
DATABASE_USER = 'ld1007co'             # Not used with sqlite3.
DATABASE_PASSWORD = '4or3v3r'         # Not used with sqlite3.


CACHE_BACKEND = 'file:///home/virtualhost/ld1007co/cache'
CACHE_MIDDLEWARE_SECONDS = 600


HOME_URL            = 'http://www.d1007.com'
BASE_WIKI           = 'http://wiki.d1007.com'
MEDIA_URL           = 'http://static.d1007.com/'
ADMIN_MEDIA_PREFIX  = '%sadmin/' % MEDIA_URL
MEDIA_ROOT          = '/home/virtualhost/ld1007co/d1007.com/public_html/static/'

TWEET_HOST = 't.d1007.com'
TWEET_API = '/api'
TWEET_URL = 'http://%s' % TWEET_HOST


SESSION_COOKIE_DOMAIN = '.d1007.com'


FETCH_CACHE_SECONDS = 600
FETCH_SOURCE = {
    'wiki':        { 'home': BASE_WIKI },
    'wikipedia':   { 'home': 'http://zh.wikipedia.org/w' },
    }


# mediawiki skin generator
MEDIAWIKI_SKIN_FILE = '%s/skins/wuhanx/wuhanx.wikiskin.php' % MEDIA_ROOT


DEFAULT_AVATAR = os.path.join(MEDIA_ROOT, 'userprofile/generic.jpg')

# logging
import logging
import logging.handlers

logger = logging.getLogger()
LOG_FILENAME = '/home/virtualhost/ld1007co/d1007.com/logs/wuhanx.log'
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
