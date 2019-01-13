from django.conf.urls import url
from django.contrib import admin
from django.urls import include

import app.home.urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include(app.home.urls)),

]
