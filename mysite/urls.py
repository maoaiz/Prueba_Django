from django.conf.urls import patterns, include, url
#from django.conf import settings
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from website.views import index
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', index),
    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
#     url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT,}),
    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)

#if settings.DEBUG:
#    urlpatterns += patterns('',
#        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
#            'document_root': settings.MEDIA_ROOT,
#        }),
#   )
