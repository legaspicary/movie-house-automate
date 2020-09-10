from django.urls import path
from . import views as customer_views
from dvd import views as dvd_views

app_name = 'customer'

urlpatterns = [
  path('',customer_views.CustomerView.as_view(), name = "customer_landing_page"),
  path('dashboard/', customer_views.registration, name = "customer_dashboard"),
  path('dashboard/customer', customer_views.registration, name = "customer_dashboard"),
  path('dashboard/dvd', dvd_views.DvdView.as_view(), name = "dvd_dashboard"),
]