# Generated by Django 3.1.1 on 2020-09-16 04:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0003_auto_20200916_1206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='date_registered',
            field=models.DateField(default=datetime.datetime(2020, 9, 16, 12, 11, 47, 73368)),
        ),
        migrations.AlterField(
            model_name='customer',
            name='profile_picture',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2020, 9, 16, 12, 11, 47, 73368)),
        ),
        migrations.AlterField(
            model_name='person',
            name='brgy',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='city',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='country',
            field=models.CharField(blank=True, max_length=70, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='middlename',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='state',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='street',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]