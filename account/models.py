from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
# Create your models here.
import os

def newpath(instance,filename):
	return os.path.join('profile_pics',"%d" % instance.id,filename)
	
class MyUser(AbstractUser) :
	GENDER_CHOICES = (('M', 'Male'),('F', 'Female'),)
	profile_pic = models.ImageField(upload_to = newpath, blank = True)
	gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default=GENDER_CHOICES[0][0])
	dob = models.DateField('Date of Birth', blank=True, null=True)
	phone = PhoneNumberField(unique = True, null=True, blank=True)
	street_address = models.CharField('Street Address', max_length = 100, null=True, blank=True)
#    city = models.ForeignKey(City, blank=True, null=True, on_delete=models.SET_NULL)
	pincode = models.CharField(max_length=8, default="0000000")
	on = models.DateTimeField('created on',auto_now_add = True)
	
@receiver(pre_delete, sender=MyUser)
def myuser_delete(sender, instance, **kwargs):
	instance.profile_pic.delete(False)	
