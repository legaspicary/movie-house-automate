# Generated by Django 3.1.1 on 2020-09-17 12:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0004_auto_20200916_1211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='date_registered',
            field=models.DateField(default=datetime.datetime(2020, 9, 17, 12, 2, 49, 368144)),
        ),
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2020, 9, 17, 12, 2, 49, 368144)),
        ),
    ]