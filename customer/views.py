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
            status = 500
            email_available = True
            email_msg = 'available'

            if Customer.objects.filter(email=request.POST.get('email')).exists():
                email_available = False
                email_msg = 'unavailable'
                print('email unavailable')
            if email_available:
                form = CustomerForm(request.POST)
                print("is form valid?"+str(form.is_valid()))
                if form.is_valid():
                    #print(form.cleaned_data['city'])
                    customer = form.save()
                    status = 200
                    print('customer '+customer.firstname+' saved')

            arr = list(Customer.objects.filter(is_deleted=False).values())
            format_date(arr)
            json = {'data':arr,'status':'Finished processing data from views','email': email_msg}
            return JsonResponse(json,status=status)
        else:
            return render(request,'customer/dashboard.html')
