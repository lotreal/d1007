from django.conf import settings

def site(request):
    """
    Returns general context variables of this site
    """
    user = request.user
    return {
        'HOME': settings.HOME_URL,
        'WIKI': '%s/index.php' % settings.BASE_WIKI,
        'MEDIA_URL': settings.MEDIA_URL,
        'TWEET_URL': settings.TWEET_URL,
        'USE_RUNSERVER': settings.USE_RUNSERVER,

        'site_cp_ok': 'CONTEXT_PROCESSORS_SET_OK',
        'project_path': settings.PROJECT_PATH,
        'site_name': 'd1007',
        'authenticated': user.is_authenticated(),
        'is_active_user': user.is_authenticated() and user.is_active,
        'current_username': user.username,
        # 'body_attribute': '',

#         'panel_prefix': html_panel_prefix(),
#         'panel_suffix': html_panel_suffix(),
        
        # 'logined': request.passport.is_logined(),
        # 'use_livehelp': True and request.passport.is_logined(),
        # 'passport': request.passport,

        # 'wm_auto_connect': 'true' if request.REQUEST.get('lh', None) is not None else 'false',
    }

