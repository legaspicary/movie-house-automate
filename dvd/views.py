from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .forms import DVDForm
from .models import *

# Create your views here.
dvds = [
    {'dateRegistered': 'August 12, 2020', 'genre': 'Romance', 'title': 'Kaguya-sama Love is War?', 'releaseDate': 'August 21, 2021', 'price': 1100,'numOfItems':12},
    {'dateRegistered': 'August 13, 2020', 'genre': 'Comedy', 'title': 'Gintama', 'releaseDate': 'August 4, 2021', 'price': 441,'numOfItems':22},
    {'dateRegistered': 'August 16, 2020', 'genre': 'Action', 'title': 'Shingeki no Kyojin', 'releaseDate': 'August 14, 2021', 'price': 771,'numOfItems':17},
    {'dateRegistered': 'August 6, 2020', 'genre': 'Fantasy', 'title': 'Re: Zero', 'releaseDate': 'August 3, 2021', 'price': 512,'numOfItems':52},
]
class DvdView(View):
	def get(self,request):
		context = {
			'dvds': dvds,
			'title':'DVD Dashboard'
		}
		return render(request, 'dvd/dashboard.html',context)

	def post(self, request):
		form = DVDForm(request.POST)
		# if form.is_valid():
		title = request.POST.get('add-title')
		director = request.POST.get('add-title')
		genre = request.POST.get('add-title')
		release_date = request.POST.get('add-release_date')
		casts = request.POST.get('add-casts')
		price = request.POST.get('add-price')
		number_of_items = request.POST.get('add-number_of_items')
		picture = request.POST.get('add-picture')
		form = DVD(title = title, director = director, genre = genre, release_date = release_date,
								casts = casts, price = price, number_of_items = number_of_items, picture = picture)
		form.save()

		return HttpResponse('DVD recorded successfully')
		# else:
		# 	print(form.errors)
		# 	print(request.POST.get('add-picture'))
		# 	return HttpResponse('not valid')