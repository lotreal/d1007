<VirtualHost *:80>
    ServerAdmin lotreal+locald1007@gmail.com
    ServerName local-d1007.com
    ServerAlias www.local-d1007.com wiki.local-d1007.com static.local-d1007.com django.local-d1007.com mt.local-d1007.com test.local-d1007.com t.local-d1007.com 
    
    DocumentRoot /home/lot/www/d1007.com/public_html/
    <Directory "/home/lot/www/d1007.com/public_html/">
	Options All
	AllowOverride All
    </Directory>

    ErrorLog /home/lot/www/d1007.com/logs/error.log

    # Possible values include: debug, info, notice, warn, error, crit,
    # alert, emerg.
    LogLevel warn
    CustomLog /home/lot/www/d1007.com/logs/access.log combined

    RewriteEngine on
    RewriteLogLevel 2
    RewriteLog "/home/lot/www/d1007.com/logs/rewrite.log"
</VirtualHost>
