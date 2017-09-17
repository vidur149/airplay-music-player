from django import forms
from django.contrib.auth import authenticate
from .models import MyUser
class LoginForm(forms.Form):
	username = forms.CharField(max_length=100)
	password = forms.CharField(max_length=32, widget=forms.PasswordInput)
	error_css_class = 'error'    
	required_css_class = 'required'
	def __init__(self, *args, **kwargs):
		self.user_cache = None
		super(LoginForm, self).__init__(*args, **kwargs)

	def clean(self):
		username = self.cleaned_data.get('username')
		password = self.cleaned_data.get('password')
		
		if username and password :
			self.user_cache = authenticate(username = username, password = password)
			if self.user_cache is None :
				raise forms.ValidationError('Please Enter a Correct Username and Password')
			elif not self.user_cache.is_active:
				raise forms.ValidationError('This account is inactive')
		return self.cleaned_data
        
	def get_user(self):
		return self.user_cache
		
class SignupForm(forms.ModelForm) :
	password1 = forms.CharField(label = 'enter password', widget=forms.PasswordInput)
	password2 = forms.CharField(label = 'confirm password', max_length=100, widget=forms.PasswordInput)	
	error_css_class = 'error'    
	required_css_class = 'required'
	def __init__(self, *args, **kwargs) :
		super(SignupForm, self).__init__(*args, **kwargs)
		self.fields['email'].required = True
		self.fields['phone'].required = True
	
	def clean_password2(self) :
		password1 = self.cleaned_data.get('password1')
		password2 = self.cleaned_data.get('password2')
		if password1 and password2 and password1 != password2 :
			 raise forms.ValidationError("Passwords don't match")
		else :
			return password2
			
	def clean_email(self):
		email_data = self.cleaned_data.get("email")
		if email_data and len(MyUser.objects.filter(email = email_data)) > 0:
			raise forms.ValidationError("User with this email already exist")
		return email_data

	def save(self, commit = True) :
		user = super(SignupForm,self).save(commit = False)
		user.set_password(self.cleaned_data['password1'])
		if commit :
			user.save()
		return user
				
	class Meta :
		model = MyUser
		fields = ['username', 'email', 'phone', 'gender']
			
class SettingsForm(forms.ModelForm) :
	
	def __init__(self, *args, **kwargs) :
		super(SettingsForm, self).__init__(*args, **kwargs)
		self.fields['phone'].required = True
	class Meta :
		model = MyUser
		fields = [ 'first_name', 'last_name','profile_pic','phone', 'gender', 'dob', 'street_address', 'pincode']
