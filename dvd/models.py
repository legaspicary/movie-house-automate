from django.db import models
from datetime import datetime

# Create your models here.
class DVD(models.Model):
	sku = models.AutoField(primary_key=True, verbose_name='SKU')
	title = models.CharField(max_length=50, blank=False, default='Untitled DVD')
	date_registered = models.DateField(default=datetime.now)
	director = models.CharField(max_length=50, blank=True)
	genre = models.CharField(max_length=100, blank=True)
	release_date = models.DateField(blank=True)
	casts = models.CharField(max_length=500, blank=True)
	price = models.FloatField(default=0)
	number_of_items = models.IntegerField(default=0)
	picture = models.FileField(upload_to='dvd_images/')
	is_deleted = models.BooleanField(default=False)
	
	# to show title in admin dashboard
	def __str__(self):
		return self.title

	# to show table name in database phpmyadmin
	class Meta:
		db_table = "DVD"