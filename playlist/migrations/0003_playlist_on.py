# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0002_auto_20150805_1831'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
