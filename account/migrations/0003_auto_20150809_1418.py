# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20150807_1902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='dob',
            field=models.DateField(verbose_name='Date of Birth', blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='myuser',
            name='street_address',
            field=models.CharField(verbose_name='Street Address', blank=True, max_length=100, null=True),
        ),
    ]
