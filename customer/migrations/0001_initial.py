# Generated by Django 3.1.1 on 2020-09-15 03:01

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=100)),
                ('middlename', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('brgy', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=20)),
                ('zip', models.IntegerField()),
                ('country', models.CharField(max_length=70)),
                ('gender', models.CharField(max_length=6)),
                ('birthdate', models.DateField(default=datetime.datetime(2020, 9, 15, 3, 1, 2, 198311, tzinfo=utc))),
                ('status', models.CharField(max_length=20)),
                ('spouse_firstname', models.CharField(max_length=100)),
                ('spouse_lastname', models.CharField(max_length=100)),
                ('spouse_occupation', models.CharField(max_length=100)),
                ('no_of_children', models.IntegerField()),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'Person',
            },
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='customer.person')),
                ('profile_picture', models.CharField(max_length=100)),
                ('date_registered', models.DateField(default=datetime.datetime(2020, 9, 15, 3, 1, 2, 199307, tzinfo=utc))),
            ],
            options={
                'db_table': 'Customer',
            },
            bases=('customer.person',),
        ),
    ]
