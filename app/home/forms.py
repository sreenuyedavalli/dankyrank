from django import forms


class NewGroupForm(forms.Form):
    name = forms.CharField(max_length=100)
