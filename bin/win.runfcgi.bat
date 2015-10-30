cd ..\src\django\wuhanx
manage.py runfcgi method=threaded host=192.168.0.21 port=8025 daemonize=false --settings settings_debug
pause