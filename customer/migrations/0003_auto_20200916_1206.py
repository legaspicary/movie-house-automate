# Generated by Django 3.1.1 on 2020-09-16 04:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_auto_20200915_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='date_registered',
            field=models.DateField(default=datetime.datetime(2020, 9, 16, 12, 6, 44, 71358)),
        ),
        migrations.AlterField(
            model_name='customer',
            name='profile_picture',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2020, 9, 16, 12, 6, 44, 71358)),
        ),
        migrations.AlterField(
            model_name='person',
            name='brgy',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='country',
            field=models.CharField(max_length=70, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='gender',
            field=models.CharField(max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='middlename',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='no_of_children',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='person',
            name='spouse_firstname',
            field=models.CharField(default='N/A', max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='spouse_lastname',
            field=models.CharField(default='N/A', max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='spouse_occupation',
            field=models.CharField(default='N/A', max_length=100),
        ),
        migrations.AlterField(
            model_name='person',
            name='state',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='status',
            field=models.CharField(default='Single', max_length=20),
        ),
        migrations.AlterField(
            model_name='person',
            name='street',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='zip',
            field=models.IntegerField(default=0),
        ),
    ]
