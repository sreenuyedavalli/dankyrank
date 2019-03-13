from django.conf.urls import url
from app.home.views import LoginView, HomeView, NewGroupView, MyGroupsView

urlpatterns = [
    url(r'^$', HomeView.as_view(template_name='react.html'), name="home"),
    url(r'^login$', LoginView.as_view(template_name='react.html'), name="login"),
    url(r'^newgroup$', NewGroupView.as_view(template_name='react.html'), name="newgroup"),
    url(r'^viewmygroup$', MyGroupsView.as_view(template_name='react.html'), name="viewmygroups"),
]
