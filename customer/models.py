from django.db import models
#from datetime import datetime
from datetime import datetime

# Base model for customer


class Person(models.Model):
    # Primary is provided by Django if it is not specified
    # id
    # name
    firstname = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100,blank=True,null=True)
    lastname = models.CharField(max_length=100)
    # address
    street = models.CharField(max_length=100,blank=True,null=True)
    brgy = models.CharField(max_length=50,blank=True,null=True)
    city = models.CharField(max_length=50,blank=True,null=True)
    state = models.CharField(max_length=20,blank=True,null=True)
    zip = models.IntegerField(default=0)
    country = models.CharField(max_length=70,blank=True,null=True)
    # gender, to be replaced by TextChoices in Django
    gender = models.CharField(max_length=6,blank=True,null=True)
    # birthdate
    birthdate = models.DateField(default=datetime.now())
    # family info
    status = models.CharField(max_length=20,default='Single')
    spouse_name = models.CharField(max_length=100,default='N/A')
    spouse_occupation = models.CharField(max_length=100,default='N/A')
    no_of_children = models.IntegerField(default=0)
    # deleted identifier
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = "Person"

    def __str__(self):
        return self.firstname + self.lastname


class Customer(Person):
    # picture, todo: search efficient ways of storing pictures in a server
    profile_picture = models.CharField(max_length=100,blank=True,null=True)
    # date registered
    date_registered = models.DateField(default=datetime.now())

    class Meta:
        db_table = "Customer"
