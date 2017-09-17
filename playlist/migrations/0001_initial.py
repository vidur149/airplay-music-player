# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='playlist',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30, unique=True)),
                ('desc', models.CharField(max_length=100, blank=True, null=True)),
                ('by', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='songfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('song', models.FileField(upload_to='/songs/', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='playlist',
            name='song',
            field=models.ManyToManyField(to='playlist.songfile', blank=True),
        ),
    ]
