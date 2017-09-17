# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import account.models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='profile_pic',
            field=models.ImageField(blank=True, upload_to=account.models.newpath),
        ),
    ]
