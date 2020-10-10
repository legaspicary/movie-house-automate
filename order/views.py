from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from .models import Order


def format_date(orders):
    for order in orders:
        order['date_rented'] = order['date_rented'].strftime("%B %d, %Y")


def get_orders():
    orders = Order.objects.filter(is_deleted=False)
    orders_dict = orders.values()
    format_date(orders_dict)
    return list(orders_dict)


class OrderView(View):
	def get(self, request):
		return render(request, 'order/orders.html')
