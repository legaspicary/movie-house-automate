from django.db import models
from datetime import datetime

# Create your models here.
class DVD(models.Model):
	sku = models.AutoField(primary_key=True, verbose_name='SKU')
	title = models.CharField(max_length=50, blank=False, default='Untitled DVD')
	date_registered = models.DateField(default=datetime.now, null=True)
	director = models.CharField(max_length=50, null=True, blank=True)
	genre = models.CharField(max_length=100, null=True, blank=True)
	release_date = models.DateField(null=True, blank=True)
	casts = models.CharField(max_length=500, null=True)
	price = models.FloatField(default=0, null=True)
	number_of_items = models.IntegerField(default=0, null=True)
	picture = models.FileField(upload_to='dvd_images/')
	is_deleted = models.BooleanField(default=False)
	
	# to show title in admin dashboard
	def __str__(self):
		return self.title

	# to show table name in database phpmyadmin
	class Meta:
		db_table = "DVD"