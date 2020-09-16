# to create a form, you will need to import the django forms module
from django import forms
# to specify the model for the form, you will need to import it
from .models import Customer


class CustomerForm(forms.ModelForm):
    # use the class Meta to specify the model for the customer form
    class Meta:
        model = Customer
        # fields to check for is_valid() method
        fields = ('firstname', 'lastname')

    def __docstring__(self):
        return 'The form module for customer, validates firstname and lastname'
