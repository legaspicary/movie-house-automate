from django.db import models
#from datetime import datetime
from datetime import datetime
import os
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
    zip = models.CharField(max_length=10,blank=True,null=True)
    country = models.CharField(max_length=70,blank=True,null=True)
    # gender, to be replaced by TextChoices in Django
    gender = models.CharField(max_length=6,blank=True,null=True)
    # birthdate
    birthdate = models.DateField(blank=True,null=True)
    # family info
    status = models.CharField(max_length=20,blank=True,null=True)
    spouse_name = models.CharField(max_length=100,blank=True,null=True)
    spouse_occupation = models.CharField(max_length=100,blank=True,null=True)
    no_of_children = models.IntegerField(default=0)
    # deleted identifier
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = "Person"

    def __str__(self):
        return self.firstname + self.lastname


class Customer(Person):
    # picture, todo: search efficient ways of storing pictures in a server
    profile_picture = models.ImageField(blank=True,null=True,upload_to="images/")
    # date registered
    date_registered = models.DateField(default=datetime.now())
    # email
    email = models.CharField(max_length=100)
    class Meta:
        db_table = "Customer"

    def get_profile_picture(self):
        if self.profile_picture:
            return self.profile_picture.url
        else:
            return '/static/img/profile_default.png'

def content_file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s_%s.%s" % ('customer', instance.id, ext)
    return os.path.join('images', filename)
