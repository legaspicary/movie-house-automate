# Generated by Django 3.1.1 on 2020-09-24 23:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dvd', '0005_auto_20200923_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dvd',
            name='casts',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='date_registered',
            field=models.DateField(default=datetime.datetime.now, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='director',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='genre',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='number_of_items',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='price',
            field=models.FloatField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='release_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]