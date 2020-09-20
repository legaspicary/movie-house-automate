# to create a form, you will need to import the django forms module
from django import forms
# to specify the model for the form, you will need to import it
from .models import Customer


class CustomerForm(forms.ModelForm):
    middlename = forms.CharField(required=False)
    street = forms.CharField(required=False)
    brgy = forms.CharField(required=False)
    city = forms.CharField(required=False)
    state = forms.CharField(required=False)
    zip = forms.IntegerField(required=False)
    country = forms.CharField(required=False)
    gender = forms.CharField(required=False)
    birthdate = forms.DateField(required=False)
    status = forms.CharField(required=False)
    spouse_name = forms.CharField(required=False)
    spouse_occupation = forms.CharField(required=False)
    no_of_children = forms.IntegerField(required=False)
    # use the class Meta to specify the model for the customer form
    class Meta:
        model = Customer
        # fields to check for is_valid() method
        fields = (  'firstname', 'middlename', 'lastname',
                    #address
                    'street', 'brgy', 'city', 'state', 'zip', 'country',
                    'gender',
                    'birthdate',
                    #family info
                    'status', 'spouse_name', 'spouse_occupation', 'no_of_children'
                    #'profile_picture,
                    )

    def __docstring__(self):
        return 'The form module for customer, validates firstname and lastname'
