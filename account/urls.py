from django.conf.urls import include, url, static
from django.conf import settings
from django.contrib import admin
from account.views import loginpage, signuppage, homepage, logoutview, Settings
urlpatterns = []
urlpatterns += [
	url(r'^main/$',loginpage, name = 'main'),
	url(r'^signup/$', signuppage, name = 'signup'),
	#url(r'^musicplayer/$', musicplayer', name = 'musicplayer'),
	url(r'^home/$', homepage, name = 'home'),
	url(r'^logout/$', logoutview, name = 'logout'),
	url(r'^settings/$', Settings, name = 'settings')
] 
# + static.static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

#if settings.DEBUG:
#	urlpatterns += patterns(
#		'django.views.static',
#		(r'media/(?P<path>.*)',
#		'serve',
#		{'document_root': settings.MEDIA_ROOT}), )
