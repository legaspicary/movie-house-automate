from django.db import models
#from datetime import datetime
from django.utils import timezone

# Base model for customer


class Person(models.Model):
    # Primary is provided by Django if it is not specified
    # id
    # name
    firstname = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    # address
    street = models.CharField(max_length=100)
    brgy = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=20)
    zip = models.IntegerField()
    country = models.CharField(max_length=70)
    # gender, to be replaced by TextChoices in Django
    gender = models.CharField(max_length=6)
    # birthdate
    birthdate = models.DateField(default=timezone.now())
    # family info
    status = models.CharField(max_length=20)
    spouse_firstname = models.CharField(max_length=100)
    spouse_lastname = models.CharField(max_length=100)
    spouse_occupation = models.CharField(max_length=100)
    no_of_children = models.IntegerField()
    # deleted identifier
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = "Person"

    def __str__(self):
        return self.firstname + self.middlename + self.lastname


class Customer(Person):
    # picture, todo: search efficient ways of storing pictures in a server
    profile_picture = models.CharField(max_length=100)
    # date registered
    date_registered = models.DateField(default=timezone.now())

    class Meta:
        db_table = "Customer"
