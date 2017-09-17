from django import forms
from .models import songfile,playlist
from account.models import MyUser
import os

class SongForm(forms.ModelForm):

	def clean_song(self) :
		
		song = self.cleaned_data.get('song')
		if song :					
				if song.size > 20*1024*1024 :
					raise forms.ValidationError("Audio file larger than 20 MB's")
					
				if not song.content_type in ["audio/mp3", "audio/mp4"]:
					raise forms.ValidationError("Content type is not mp3/mp4")
					
				#if os.path.splitext(song.name)[1] in [".mp3", ".mp4"] :
				#	raise forms.ValidationError("Doesn't have a proper extension")
		else :
			raise forms.ValidationError("Couldn't read the give file")
		return song	
	
	def __init__(self, *args, **kwargs) :
		super(SongForm, self).__init__(*args, **kwargs)
		self.fields['song'].label = ''
		
	class Meta:
		model = songfile
		fields = ['song']
		
class PlaylistForm(forms.ModelForm) :	
	class Meta:
		model = playlist
		fields = ['name','desc']
