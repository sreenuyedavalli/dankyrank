from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import TemplateView


class LoginView(TemplateView):

    def get_context_data(self, **kwargs):
        ctx = super(LoginView, self).get_context_data(**kwargs)
        ctx['title'] = "login to dankyrank"
        ctx['component'] = 'Login'
        ctx['initialState'] = {"login_link": reverse("social:begin", args=["spotify"])}
        return ctx


class IndexView(LoginRequiredMixin, TemplateView):

    def get_context_data(self, **kwargs):
        ctx = super(IndexView, self).get_context_data(**kwargs)
        ctx['title'] = "Django React Multi-page App"
        ctx['component'] = 'Home'
        ctx['initialState'] = {}
        return ctx

class NewGroupView(LoginRequiredMixin, TemplateView):

    def get_context_data(self, **kwargs):
        ctx = super(NewGroupView, self).get_context_data(**kwargs)
        ctx['title'] = "Django React Multi-page App"
        ctx['component'] = 'NewGroup'
        ctx['initialState'] = {}
        return ctx