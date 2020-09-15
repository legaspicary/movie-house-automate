from django.shortcuts import render
from django.views.generic import View


# Create your views here.
customers = [
    {'dateRegistered': 'August 1, 2020', 'firstName': 'Jessica','lastName': 'ReZero', 'birthDate': 'August 2, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 2, 2019', 'firstName': 'James','lastName': 'Loren', 'birthDate': 'August 3, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 3, 2018', 'firstName': 'Jake','lastName': 'Ipsum', 'birthDate': 'August 4, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 4, 2017', 'firstName': 'Mike','lastName': 'Dolo', 'birthDate': 'August 5, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 5, 2016', 'firstName': 'May','lastName': 'Rete', 'birthDate': 'August 6, 1990', 'city': 'ABC City'}
]


def registration(request):
    context = {
        'title': 'Customer Dashboard',
        'customers': customers,
    }
    return render(request, 'customer/dashboard.html', context)


class CustomerView(View):
    def get(self, request):
        return render(request, 'customer/landing-page.html')
