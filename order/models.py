from django.db import models
from datetime import datetime
from customer.models import *
from dvd.models import *

class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
	dvd = models.ForeignKey(DVD, on_delete=models.CASCADE)
	date_rented = models.DateField(default=datetime.now())
	no_of_items = models.IntegerField(default=0)
	is_deleted = models.BooleanField(default=False)
	class Meta:
		db_table = "Order"