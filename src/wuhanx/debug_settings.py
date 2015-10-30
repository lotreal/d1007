from settings import *
import sys,os

sys.path.insert(0, '/home/lot/www/d1007.com/lib/python/dist-packages');

DEBUG = True
TEMPLATE_DEBUG = DEBUG
USE_RUNSERVER = True
TEST_DATABASE_CHARSET = 'utf8'
INTERNAL_IPS = ('192.168.0.22')
LOGGING_OUTPUT_ENABLED = True
LOGGING_LOG_SQL = True


CACHE_BACKEND = 'locmem:///'
# CACHE_BACKEND = 'file:///home/lot/workspace/d1007com/tmp'
CACHE_MIDDLEWARE_SECONDS = 60


HOME_URL   = 'http://debug-d1007.com:8000'
BASE_WIKI  = 'http://wiki.d1007.com'
# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = HOME_URL + '/static/'
# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = os.path.normpath(os.path.join(PROJECT_PATH, '../static/'))
# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '%sadmin/' % MEDIA_URL

TWEET_HOST = 't.d1007.com'
TWEET_API = '/api'
TWEET_URL = 'http://%s' % TWEET_HOST

FETCH_SOURCE = {
    'wiki':        { 'home': BASE_WIKI },
    'wikipedia':   { 'home': 'http://zh.wikipedia.org/w' },
    }


if DEBUG:
    MIDDLEWARE_CLASSES += (
        'djangologging.middleware.LoggingMiddleware',
        'djangologging.middleware.SuppressLoggingOnAjaxRequestsMiddleware',
        #'wuhanx._dev_.middleware.RequestViewerMiddleware',
        )


# mediawiki skin generator
MEDIAWIKI_SKIN_FILE = '%s/skins/wuhanx/wuhanx.wikiskin.php' % MEDIA_ROOT


DEFAULT_AVATAR = os.path.join(MEDIA_ROOT, 'userprofile/generic.jpg')
