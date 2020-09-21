from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from .forms import CustomerForm
from .models import Customer

# Create your views here.

def landing_page(request):
    return render(request, 'customer/landing-page.html')

#Formats date to MM dd YYYY (e.g. September 20, 2020)
def format_date(customers):
    for customer in customers:
        customer['date_registered'] = customer['date_registered'].strftime("%B %d, %Y")
        if customer['birthdate']:
            customer['birthdate'] = customer['birthdate'].strftime("%B %d, %Y")

class CustomerView(View):
    def get(self, request):
        if request.is_ajax():
            #does not include deleted customer
            arr = list(Customer.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr}
            return JsonResponse(json)
        context = {
            'title': 'Customer Dashboard'
        }
        return render(request, 'customer/dashboard.html', context)
    def post(self,request):
        if request.is_ajax():
            form = CustomerForm(request.POST)
            print("is form valid?"+str(form.is_valid()))
            print(request.POST.get('zip'))
            print(request.POST.get('status'))
            if form.is_valid():
                #print(form.cleaned_data['city'])
                customer = form.save()
                print('customer after save:')
                print(customer.gender)
                print(customer.status)
            arr = list(Customer.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr,'status':'Saved from the database, passing new data'}
            return JsonResponse(json)
        else:
            return render(request,'customer/dashboard.html')
