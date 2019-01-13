from django.conf.urls import url
from django.views.generic import TemplateView


class IndexView(TemplateView):

    def get_context_data(self, **kwargs):
        ctx = super(IndexView, self).get_context_data(**kwargs)
        ctx['title'] = "Django React Multi-page App"
        ctx['component'] = 'Home'
        ctx['initialState'] = {"foo": "bar"}
        return ctx


urlpatterns = [
    url(r'^$', IndexView.as_view(template_name='react.html'))
]
