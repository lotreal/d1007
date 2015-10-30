from django.db import models
from userprofile.models import BaseProfile
#from django.utils.translation import ugettext as _
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
import datetime
from django.db.models.signals import pre_save, post_save
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ImproperlyConfigured
from django.contrib.auth.models import User, SiteProfileNotAvailable
from django.conf import settings
import logging
from userprofile.models import Avatar

from iluo.tweet.sync import SYNC_QUEUE


GENDER_CHOICES = ( ('F', _('Female')), ('M', _('Male')),)

class Profile(BaseProfile):
    # >> name
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, verbose_name=_('Gender'))
    birthdate = models.DateField(default=datetime.date.today(), blank=True, verbose_name=_('Birthday'))
    language = models.CharField(max_length=16, choices=settings.LANGUAGES, blank=True, verbose_name=_('Language'))
    url = models.URLField(blank=True, verbose_name=_('Url'))
    bio = models.TextField(blank=True, verbose_name=_('BIO'))

    point = models.IntegerField(default=0, blank=True, verbose_name=_('Point'), editable=False)
    provider = models.CharField(max_length=255, blank=True, verbose_name=_('OAuth Provider'), editable=False)
    uuid = models.CharField(max_length=255, blank=True, verbose_name=_('UUID'), editable=False, unique=True)
    token = models.CharField(max_length=255, blank=True, verbose_name=_('Token'), editable=False)

    class Meta:
        permissions = (
            ("can_edit_wiki", "Can edit wiki"),
            )

def set_uuid(sender, **kwargs):
    profile = kwargs["instance"]
    if len(profile.uuid) == 0:
        profile.uuid = 'http://api.d1007.com/people/%s' % profile.user.id

pre_save.connect(set_uuid, sender=Profile)


# class MyUser(User):
#     class Meta:
#         proxy = True
#     def do1(self):
#         pass

def sync_profile_table(sender, *args, **kwargs):
    # if kwargs['created']:
    #     return
    logging.debug('[ Sync ] sync_profile_table')
    profile = kwargs['instance']
    user = profile.user
    SYNC_QUEUE[user.username] = {'u':user,'p':profile}
    # data = get_sync_data(user, profile)
    # sync_profile_to_laconica(**data)
post_save.connect(sync_profile_table, sender=Profile)

def sync_user_table(sender,*args, **kwargs):
    user = kwargs['instance']
    # if kwargs['created']:
    #     # profile, created = Profile.objects.get_or_create(user=user)
    #     profile = None
    # else:
    #     profile = user.get_profile()
    SYNC_QUEUE[user.username] = {'u':user,'p':None}
post_save.connect(sync_user_table, sender=User)

def sync_avatar_table(sender,*args, **kwargs):
    user = kwargs['instance'].user
    SYNC_QUEUE[user.username] = {'u':user,'p':None}
post_save.connect(sync_avatar_table, sender=Avatar)
