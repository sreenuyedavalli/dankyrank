from django.conf.urls import url

from app.home.views import LoginView, IndexView

urlpatterns = [
    url(r'^$', IndexView.as_view(template_name='react.html'), name="index"),
    url(r'^login$', LoginView.as_view(template_name='react.html'), name="login"),
]
