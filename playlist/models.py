from django.db import models
from account.models import MyUser
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
import os
# Create your models here.

def newpath(instance,filename):
	return os.path.join('songs',"%d" % instance.by.id,filename)


class songfile(models.Model):
	song = models.FileField(upload_to = newpath, blank = True, null = True)
	by = models.ForeignKey(MyUser)
	
	def __str__(self):
		return self.song.name.split('/')[-1]
		
@receiver(pre_delete, sender=songfile)
def songfile_delete(sender, instance, **kwargs):
	instance.song.delete(False)		
    
class playlist(models.Model):
	name = models.CharField('Name',max_length = 30, blank = False, null = False)
	desc = models.CharField('Description',max_length = 100, blank = True, null = True)
	song = models.ManyToManyField(songfile, blank = True)
	by = models.ForeignKey(MyUser)
	on = models.DateTimeField(auto_now_add = True, null = True)
	
	class Meta:
		unique_together = ('name','by')
	def __str__(self):
		return self.name	

