# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0005_auto_20150807_1902'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='playlist',
            unique_together=set([('name', 'by')]),
        ),
    ]
