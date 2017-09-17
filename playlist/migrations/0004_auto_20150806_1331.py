# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0003_playlist_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songfile',
            name='song',
            field=models.FileField(null=True, blank=True, upload_to='songs/'),
        ),
    ]
