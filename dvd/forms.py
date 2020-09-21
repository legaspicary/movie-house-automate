from django import forms
from .models import DVD

class DVDForm(forms.ModelForm):
	title = forms.CharField(required=False)
	price = forms.FloatField(required=False)
	number_of_items = forms.IntegerField(required=False)
	director = forms.CharField(required=False)
	casts = forms.CharField(required=False)
	class Meta:
		model = DVD
		fields = ('title', 'director', 'genre', 'release_date',
				'casts', 'price', 'number_of_items', 'picture')