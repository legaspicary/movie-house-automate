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

#Gets the profile picture url for each customer
def prepare_profile_url(customer_dict,customers):
    for i in range(len(customers)):
        customer_dict[i]['profile_picture'] = customers[i].get_profile_picture()

#Returns list for customers from db
def get_customers():
    customers = Customer.objects.filter(is_deleted=False)
    customer_dict = customers.values()
    format_date(customer_dict)
    prepare_profile_url(customer_dict,customers)
    return list(customer_dict)

class CustomerView(View):
    def get(self, request):
        if request.is_ajax():
            #does not include deleted customer
            arr = get_customers()
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
            if request.POST.get('operation') == 'create':
                #Check if email already exists
                if Customer.objects.filter(email=request.POST.get('email')).exists():
                    email_available = False
                    email_msg = 'unavailable'
                #Check validity of form
                if email_available:
                    form = CustomerForm(request.POST,request.FILES)
                    if form.is_valid():
                        customer = form.save(commit=False)
                        customer.profile_picture = request.FILES.get('profile_picture','')
                        customer.save()
                        status = 200
                        print('customer '+customer.firstname+' saved')
                        #print('customer picture:'+customer.profile_picture.url+' saved')
            elif request.POST.get('operation') == 'update':
                customer = Customer.objects.get(id=request.POST.get('id'))
                form = CustomerForm(request.POST,request.FILES,instance=customer)
                #Check if email already exists
                if Customer.objects.filter(email=request.POST.get('email')).exists() and customer.email != request.POST.get('email'):
                    email_available = False
                    email_msg = 'unavailable'
                if email_available:
                    if form.is_valid():
                        customer = form.save(commit=False)
                        customer.profile_picture = request.FILES.get('profile_picture','')
                        customer.save()
                        status = 200
                        print('customer '+customer.firstname+' updated')
                        #print('customer picture:'+customer.profile_picture.url+' saved')
            arr = get_customers()
            json = {'data':arr,'status':'Finished processing data from views','email': email_msg}
            return JsonResponse(json,status=status)
        else:
            return render(request,'customer/dashboard.html')

# class UpdateCustomerView(View):
#     def get(self, request):
#         return render(request,'customer/dashboard.html')
#     def post(self,request):
#         status = 500
#         email_available = True
#         email_msg = 'available'
#         if request.is_ajax():
#             customer = Customer.objects.get(id=request.POST.get('id'))
#             form = CustomerForm(request.POST,request.FILES,instance=customer)
#             #Check if email already exists
#             if Customer.objects.filter(email=request.POST.get('email')).exists() and customer.email != request.POST.get('email'):
#                 email_available = False
#                 email_msg = 'unavailable'
#             if email_available:
#                 if form.is_valid():
#                     customer = form.save(commit=False)
#                     customer.profile_picture = request.FILES.get('profile_picture','')
#                     customer.save()
#                     status = 200
#                     print('customer '+customer.firstname+' updated')
#                     #print('customer picture:'+customer.profile_picture.url+' saved')
#         arr = get_customers()
#         json = {'data':arr,'status':'Finished processing data from views','email': email_msg}
#         return JsonResponse(json,status=status)