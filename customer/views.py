from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from .forms import CustomerForm
from .models import Customer

# Create your views here.

def landing_page(request):
    return render(request, 'customer/landing-page.html')


class CustomerView(View):
    def get(self, request):
        print(Customer.objects.all())
        context = {
            'title': 'Customer Dashboard',
            'customers': Customer.objects.values(),
        }
        return render(request, 'customer/dashboard.html', context)
    def post(self,request):
        if request.is_ajax():
            form = CustomerForm(request.POST)
            print("is form valid?"+str(form.is_valid()))
            if form.is_valid():
                #print(form.cleaned_data['city'])
                form.save()
                return JsonResponse({'return_text': 'returned from server views.py'})
        else:
            return render(request,'customer/dashboard.html')
