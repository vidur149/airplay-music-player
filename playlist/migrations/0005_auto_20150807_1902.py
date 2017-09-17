# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import playlist.models


class Migration(migrations.Migration):

    dependencies = [
        ('playlist', '0004_auto_20150806_1331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='desc',
            field=models.CharField(max_length=100, blank=True, verbose_name='Description', null=True),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='name',
            field=models.CharField(max_length=30, verbose_name='Name *'),
        ),
        migrations.AlterField(
            model_name='songfile',
            name='song',
            field=models.FileField(blank=True, null=True, upload_to=playlist.models.newpath),
        ),
        migrations.AlterUniqueTogether(
            name='playlist',
            unique_together=set([]),
        ),
    ]
