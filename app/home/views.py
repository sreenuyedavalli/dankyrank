from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import TemplateView, CreateView
import spotipy
from spotipy import oauth2
from django.core.serializers import serialize


class LoginView(TemplateView):
    def get_context_data(self, **kwargs):
        ctx = super(LoginView, self).get_context_data(**kwargs)
        ctx['title'] = "login to dankyrank"
        ctx['component'] = 'Login'
        ctx['initialState'] = {"login_link": reverse("social:begin", args=["spotify"])}
        return ctx


class HomeView(LoginRequiredMixin, TemplateView):

    def get_context_data(self, **kwargs):
        ctx = super(HomeView, self).get_context_data(**kwargs)
        ctx['title'] = "dankyrank"
        ctx['component'] = 'Home'
        ctx['initialState'] = {}
        return ctx

class NewGroupView(LoginRequiredMixin, TemplateView):
    def get_context_data(self, **kwargs):
        sp = spotipy.Spotify(self.request.user.social_auth.first().access_token)
        results = sp.current_user_playlists()
        ctx = super(NewGroupView, self).get_context_data(**kwargs)
        ctx['title'] = "Django React Multi-page App"
        ctx['component'] = 'NewGroup'
        ctx['initialState'] = {
            'playlists' : results
        }
        return ctx