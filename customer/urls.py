from django.urls import path
from . import views as customer_views
from dvd import views as dvd_views

app_name = 'customer'

urlpatterns = [
  path('',customer_views.landing_page, name = "customer_landing_page"),
  path('dashboard/', customer_views.CustomerView.as_view(), name = "customer_dashboard"),
  path('dashboard/customer', customer_views.CustomerView.as_view(), name = "customer_dashboard"),
  #path('dashboard/customer/update/', customer_views.UpdateCustomerView.as_view(), name = "customer_update"),
  path('dashboard/dvd', dvd_views.DvdView.as_view(), name = "dvd_dashboard"),
]