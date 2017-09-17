from django.shortcuts import render, redirect, Http404, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from account.models import MyUser
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .forms import PlaylistForm
from .models import songfile,playlist

# Create your views here.

@login_required
@require_http_methods(['GET','POST'])
def createplaylist(request) :
	z = request.user.songfile_set.all()
	if request.method == 'GET' :
		p = PlaylistForm()
		return render(request, 'playlist/index.html', {'form':p,'files':z})
	else :
		p = PlaylistForm(request.POST)
		if p.is_valid():
			name_data=p.cleaned_data['name'];
			if name_data not in request.user.playlist_set.all() :
				instance = playlist(name=request.POST['name'], by=request.user, desc=request.POST['desc'])
				instance.save()
				song_list = request.POST.getlist('song')
				for song in song_list :
					instance.song.add(song)
				return redirect('home')
		else :
			return render(request, 'playlist/index.html', {'form':p,'files':z})	
				
@login_required
@require_http_methods(['GET','POST'])	
def editplaylist(request,id = None) :
	z = request.user.songfile_set.all()
	if request.method == 'GET' :
		if id!= None :
			Playlist = get_object_or_404(playlist, pk = id)
			p =PlaylistForm(instance = Playlist)
			list = playlist.objects.get(pk=id)
		return render(request, 'playlist/index.html', {'form':p,'files':z, 'id':id, 'list':list})
	else :
		if id!= None :
			Playlist = get_object_or_404(playlist, pk = id)
			p = PlaylistForm(request.POST, instance = Playlist)
			list = playlist.objects.get(pk=id)
			if p.is_valid():
				play = p.save(commit = False)
				song_list = request.POST.getlist('song')
				for song in song_list :
					play.song.add(song)
				play.save()
				return redirect('home')
			else :
				return render(request, 'playlist/index.html', {'form':p,'files':z, 'id':id, 'list':list})	
				
				
@require_GET
@login_required
def deletefromplaylist(request, id1, id2) :
	s = songfile.objects.get(pk=id1)
	p = playlist.objects.get(pk=id2)
	p.song.remove(s)
	return redirect('home')	
	
@require_GET
@login_required
def deletesong(request, id1) :
	s = songfile.objects.get(pk=id1)
	s.delete()
	return redirect('home')
	
@require_GET
@login_required
def deleteplaylist(request, id) :
	p = playlist.objects.get(pk=id)
	p.delete()
	return redirect('home')
