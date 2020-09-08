from django.urls import path
from . import views

app_name = 'customer'

urlpatterns = [
  path('',views.CustomerView.as_view(), name = "customer_landing_page"),
  path('registration/', views.registration, name = "customer_registration")
]