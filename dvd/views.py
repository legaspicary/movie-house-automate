from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse, HttpResponse
from .forms import DVDForm
from .models import DVD
from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Create your views here.

#Formats date to MM dd YYYY (e.g. September 20, 2020)
def format_date(dvds):
    for dvd in dvds:
        dvd['date_registered'] = dvd['date_registered'].strftime("%B %d, %Y")
        dvd['release_date'] = dvd['release_date'].strftime("%B %d, %Y")

class DvdView(View):
  def get(self,request):
        if request.is_ajax():
            arr=list(DVD.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr}
            return JsonResponse(json)
        context = {
            'title':'DVD Dashboard'
        }   
        return render(request, 'dvd/dashboard.html',context)

  def post(self, request):
    if request.is_ajax():
        form = DVDForm(request.POST, request.FILES)
        print("is form valid?"+str(form.is_valid()))
        if form.is_valid():

            title = request.POST.get('add-title')
            director = request.POST.get('add-director')
            genre = request.POST.get('add-genre')
            release_date = request.POST.get('add-release_date')
            casts = request.POST.get('add-casts')
            price = request.POST.get('add-price')
            number_of_items = request.POST.get('add-number_of_items')
            picture = request.FILES.get('add-picture')
            form = DVD(title = title, director = director, genre = genre, release_date = release_date,
                                    casts = casts, price = price, number_of_items = number_of_items, picture = picture)
            form.save()
            
        arr = list(DVD.objects.filter(is_deleted=False).values())
        format_date(arr)
        json = {'data':arr,'status':'Saved from the database, passing new data'}
        return JsonResponse(json)
    else:
        return render(request,'dvd/dashboard.html')

class UpdateDvdView(View):
    def get(self,request):
        return render(request, 'dvd/dashboard.html')
    def post(self, request):
        if request.is_ajax():
            dvd = DVD.objects.get(sku=request.POST.get('sku'))
            form = DVDForm(request.POST, request.FILES, instance=dvd)
            print("is form valid?"+str(form.is_valid()))
            if form.is_valid():
                dvd.save() 
            arr = list(DVD.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr,'status':'Updated from the database, passing updated data'}
            return JsonResponse(json)
        else:
            return render(request,'dvd/dashboard.html')

class DeleteDvdView(View):
    def get(self,request):
        return render(request, 'dvd/dashboard.html')
    def post(self, request):
        if request.is_ajax():
            dvd = DVD.objects.get(sku=request.POST.get('sku'))
            form = DVDForm(request.POST, instance=dvd)
            print("is form valid?"+str(form.is_valid()))
            if form.is_valid():
                dvd.is_deleted = True
                dvd.save() 
            arr = list(DVD.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr,'status':'Updated from the database, passing updated data'}
            return JsonResponse(json)
        else:
            return render(request,'dvd/dashboard.html')