from django.shortcuts import render, redirect, Http404, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from .models import MyUser
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from .forms import LoginForm, SignupForm, SettingsForm
from playlist.forms import SongForm, PlaylistForm
from django.core.mail import EmailMessage
from playlist.models import songfile, playlist
# Create your views here.

@require_http_methods(['GET','POST'])
def loginpage(request):
	if request.user.is_authenticated() :
		return redirect('home')
	if request.method == 'GET' :
		f = LoginForm()
		return render(request,'base/index.html',{'form':f})
	else :
		f = LoginForm(request.POST)
		if f.is_valid():
			user = f.get_user()
			login(request,user)
			return redirect('home')
		else :
			return render(request, 'base/index.html', {'form':f})
			

@require_http_methods(['GET','POST'])		
def signuppage(request):
	if request.user.is_authenticated() :
		return redirect('home')
	if request.method == 'GET' :
		f = SignupForm()
		return render(request,'home/signup.html',{'form':f})
	else :
		f = SignupForm(request.POST)
		if f.is_valid():
			user = f.save()
			return redirect('home')
		else :
			return render(request, 'home/signup.html', {'form':f})

def musicplayer(request):
	pass
	#return render(request, 'base/index.html')
	
def logoutview(request):
	logout(request)
	return redirect('main')
	
@login_required	
@require_http_methods(['GET','POST'])	
def homepage(request):
	playlist = request.user.playlist_set.all()	
	if request.method == 'GET':
		s = SongForm()
		return render(request, 'account/index.html', {'form':s, 'play':playlist})	
	else :
		s = SongForm(request.POST,request.FILES)
		if s.is_valid() :
			instance = songfile(song=request.FILES['song'],by=request.user)
			instance.save()
			return redirect('home')
		else :
			return render(request, 'account/index.html', {'form':s,'play':playlist})

@login_required	
@require_http_methods(['GET','POST'])
def Settings(request) :
	if request.method == 'GET' :
		s = SettingsForm(instance = request.user)
		return render(request, 'account/settings.html', {'form':s})
	else :
		s = SettingsForm(request.POST,request.FILES, instance = request.user)
		if s.is_valid():
			s.save()
			return redirect('home')
		else :
			return render(request, 'account/settings.html', {'form':s})	
	
