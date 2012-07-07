from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from github.views import update
from account.urls import account_urls
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^$', "website.views.index"),
     url(r'^update/$', update),

    # Uncomment the admin/doc line below to enable admin documentation:
     #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
     url(r'^admin/', include(admin.site.urls)),
     url(r'^static/(.*)$', 'django.views.static.serve', {'document_root':settings.STATIC_ROOT}),

    url(r'^account/', include(account_urls)), #incluye las urls para manejar las cuentas
)