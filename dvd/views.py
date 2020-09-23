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
    # print("is request ajax?"+str(request.is_ajax()))
    if request.is_ajax():
        form = DVDForm(request.POST)
        # print("is form valid?"+str(form.is_valid()))
        if form.is_valid():
            # request the picture
            pictures = request.FILES['add-picture']
            fileSystemStorage = FileSystemStorage()
            # Saves the Pictures
            filename = fileSystemStorage.save(pictures.name, pictures)

            title = request.POST.get('add-title')
            director = request.POST.get('add-director')
            genre = request.POST.get('add-genre')
            release_date = request.POST.get('add-release_date')
            casts = request.POST.get('add-casts')
            price = request.POST.get('add-price')
            number_of_items = request.POST.get('add-number_of_items')
            picture = fileSystemStorage.url(filename)
            form = DVD(title = title, director = director, genre = genre, release_date = release_date,
                                    casts = casts, price = price, number_of_items = number_of_items, picture = picture)
            form.save()
            
            print('image url: ' + str(fileSystemStorage.url(filename)))
            print('filename: ' + str(filename))
            # return HttpResponse('success')
        arr = list(DVD.objects.filter(is_deleted=False).values())
        format_date(arr)
        json = {'data':arr,'status':'Saved from the database, passing new data'}
        return JsonResponse(json)
        # else:
        #     print(form.errors)
        #     return render(request,'dvd/dashboard.html')
    else:
        return render(request,'dvd/dashboard.html')