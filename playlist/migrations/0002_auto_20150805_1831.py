# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('playlist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='songfile',
            name='by',
            field=models.ForeignKey(default='', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='playlist',
            name='name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='songfile',
            name='song',
            field=models.FileField(upload_to='songs/', blank=True),
        ),
        migrations.AlterUniqueTogether(
            name='playlist',
            unique_together=set([('name', 'by')]),
        ),
    ]
