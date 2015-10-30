#!/usr/bin/python
# -*- coding: utf-8 -*-
from minimock import Mock
import smtplib

def send_email(from_addr, to_addr, subject, body):
    conn = smtplib.SMTP('localhost')
    msg = 'To: %s\nFrom: %s\nSubject: %s\n\n%s' % (
        to_addr, from_addr, subject, body)
    conn.sendmail(from_addr, [to_addr], msg)
    conn.quit()
smtplib.SMTP = Mock('smtplib.SMTP')
smtplib.SMTP.mock_returns = Mock('smtp_connection')
send_email('ianb@colorstudy.com', 'joe@example.com',
           'Hi there!', 'How is it going?')
