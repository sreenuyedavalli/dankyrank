import spotipy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, FormView

from app.home.forms import NewGroupForm
from app.home.models import Playlist, Group, Membership


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


@method_decorator(csrf_exempt, name='dispatch')
class NewGroupView(LoginRequiredMixin, FormView):
    form_class = NewGroupForm
    success_url = "rgaewrgaewrgaewrg"  # TODO go to the Group Detail View for this group

    def form_valid(self, form):
        name = form.cleaned_data['name']
        sp = spotipy.Spotify(self.request.user.social_auth.first().access_token)
        master = sp.user_playlist_create(self.request.user.username, "dankyrank-{}-master".format(name), public=True)
        master_id = master['id']
        master_playlist = Playlist.objects.create(owner=self.request.user, name=master['name'],
                                                  spotify_playlist_id=master_id)

        personal = sp.user_playlist_create(self.request.user.username, "dankyrank-{}-personal".format(name),
                                           public=True)
        personal_id = personal['id']
        personal_playlist = Playlist.objects.create(owner=self.request.user, name=personal['name'],
                                                    spotify_playlist_id=personal_id)
        group = Group.objects.create(name=name, owner=self.request.user, master_playlist=master_playlist)
        Membership.objects.create(group=group, user=self.request.user, playlist=personal_playlist)
        return super(NewGroupView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        # sp = spotipy.Spotify(self.request.user.social_auth.first().access_token)
        # results = sp.current_user_playlists()
        ctx = super(NewGroupView, self).get_context_data(**kwargs)
        ctx['title'] = "dankyrank"
        ctx['component'] = 'NewGroup'
        ctx['initialState'] = {
            # 'playlists': results
        }
        return ctx


class MyGroupsView(LoginRequiredMixin, TemplateView):
    def get_context_data(self, **kwargs):
        ctx = super(MyGroupsView, self).get_context_data(**kwargs)
        ctx['title'] = "Django React Multi-page App"
        ctx['component'] = 'MyGroups'
        ctx['initialState'] = {}
        return ctx
