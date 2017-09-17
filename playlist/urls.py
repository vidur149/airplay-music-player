from django.conf.urls import include, url, static
from django.contrib import admin
from django.conf import settings
from playlist.views import createplaylist, editplaylist, deletefromplaylist, deletesong, deleteplaylist
urlpatterns = []
urlpatterns += [
	url(r'^$', createplaylist, name = 'new_playlist'),
	url(r'^(?P<id>\d+)/$', editplaylist, name = 'edit_playlist'),
	url(r'^del/(?P<id1>\d+)/(?P<id2>\d+)/$', deletefromplaylist, name = 'delete_from_playlist'),
	url(r'^del/(?P<id1>\d+)/$', deletesong, name = 'delete_song'),
	url(r'^delete/(?P<id>\d+)/$', deleteplaylist, name = 'delete_playlist')
] 
# + static.static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
