from django.shortcuts import render
from django.views.generic import View


# Create your views here.

def registration(request):
  return render(request, 'customer/dashboard.html')

class CustomerView(View):
  def get(self,request):
    return render(request, 'customer/landing-page.html')