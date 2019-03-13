from django.conf.urls import url

from app.home.views import LoginView, HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view(template_name='react.html'), name="home"),
    url(r'^login$', LoginView.as_view(template_name='react.html'), name="login"),
]
