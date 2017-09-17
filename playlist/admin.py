from django.contrib import admin
from .models import playlist, songfile
# Register your models here.

class playlistAdmin(admin.ModelAdmin) :
	list_display = ('name', 'by', 'on')
admin.site.register(playlist,playlistAdmin)

class songAdmin(admin.ModelAdmin) :
	list_display = ('song','by')
admin.site.register(songfile,songAdmin)
