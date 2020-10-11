from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from .models import Order
from dvd.models import DVD
from customer.models import Customer

#Date Registered, Dvd Title, Customer Name, No of Items, button
def format_date(orders):
    for order in orders:
        order['date_rented'] = order['date_rented'].strftime("%B %d, %Y")

def format_customer(orders):
    for order in orders:
        customer = Customer.objects.get(id=order['customer_id'])
        order['customer_name'] = customer.firstname + ' ' + customer.lastname

def format_dvd(orders):
    for order in orders:
        dvd = DVD.objects.get(sku=order['dvd_id'])
        order['dvd_title'] = dvd.title

def get_customers():
    customers = Customer.objects.filter(is_deleted=False)
    customer_dict = customers.values()
    return list(customer_dict)

def get_orders():
    orders = Order.objects.filter(is_deleted=False)
    orders_dict = orders.values()
    format_date(orders_dict)
    format_customer(orders_dict)
    format_dvd(orders_dict)
    return list(orders_dict)

class OrderView(View):
    def get(self, request):
        print(get_orders())
        if request.is_ajax():
            arr = get_orders()
            if request.GET.get('action') == 'get_customers':
                print('GETTING CUSTOMERS')
                arr = get_customers()
            if request.GET.get('action') == 'get_dvds':
                arr = list(DVD.objects.filter(is_deleted=False).values())
            json = {'data': arr}
            return JsonResponse(json)
        return render(request, 'order/orders.html')

    def post(self, request):
        if request.is_ajax():
            status = 500
            is_stocks_available = True
            stocks_message = 'available'
            if request.POST.get('operation') == 'create':
                dvd_id = request.POST.get('dvd_id')
                dvd_instance = DVD.objects.get(sku=dvd_id)
                number_of_items = request.POST.get('no_of_items')
                print(dvd_instance.number_of_items)
                total_price = float(number_of_items)*float(dvd_instance.price)
                if dvd_instance.number_of_items < int(number_of_items) or dvd_instance.number_of_items <= 0:
                    is_stocks_available = False
                    stocks_message = 'unavailable'
                # Check validity of form
                if is_stocks_available:
                    customer_id = request.POST.get('customer_id')
                    customer_instance = Customer.objects.get(id=customer_id)
                    Order.objects.create(customer=customer_instance,dvd=dvd_instance,no_of_items = number_of_items,total_price=total_price)
                    status = 200
                    dvd_instance.number_of_items -= int(number_of_items)
                    dvd_instance.save()
                    print('order saved')
            # elif request.POST.get('operation') == 'update':
            #     customer = Customer.objects.get(id=request.POST.get('id'))
            #     form = CustomerForm(
            #         request.POST, request.FILES, instance=customer)
            #     # Check if email already exists
            #     if Customer.objects.filter(email=request.POST.get('email')).exists() and customer.email != request.POST.get('email'):
            #         email_available = False
            #         email_msg = 'unavailable'
            #     if email_available:
            #         if form.is_valid():
            #             customer = form.save(commit=False)
            #             if request.FILES.get('profile_picture'):
            #                 customer.profile_picture = request.FILES.get(
            #                     'profile_picture')
            #             customer.save()
            #             status = 200
            #             print('customer '+customer.firstname+' updated')
            #             # print('customer picture:'+customer.profile_picture.url+' saved')
            elif request.POST.get('operation') == 'delete':
                order = Order.objects.get(id=request.POST.get('order_id'))
                order.is_deleted = True
                order.save()
                status = 200
                # run permanent_delete_customers() to also remove customer from db
                print('Deleted order', request.POST.get('order_id'))

            arr = get_orders()
            json = {
                'data': arr, 'status': 'Finished processing data from views', 'stocks_message': stocks_message}
            return JsonResponse(json, status=status)
        else:
            return render(request, 'customer/dashboard.html')
