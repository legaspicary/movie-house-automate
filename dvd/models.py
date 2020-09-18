from django.db import models
from datetime import datetime

# Create your models here.
class DVD(models.Model):
	sku = models.AutoField(primary_key=True, verbose_name='SKU')
	title = models.CharField(max_length=50)
	director = models.CharField(max_length=50)
	genre = models.CharField(max_length=100)
	release_date = models.DateField(default=datetime.now, blank=True)
	casts = models.CharField(max_length=500)
	price = models.FloatField()
	number_of_items = models.IntegerField()
	picture = models.TextField()
	is_deleted = models.BooleanField(default=False)
	
	def __str__(self):
		return self.title

	class Meta:
		db_table = "DVD"