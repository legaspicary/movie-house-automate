from django import forms
from .models import DVD

class DVDForm(forms.ModelForm):
	
	class Meta:
		model = DVD
		fields = ('title', 'director', 'genre', 'release_date',
				'casts', 'price', 'number_of_items', 'picture')