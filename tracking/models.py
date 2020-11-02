from django.db import models
from django.utils import timezone
from home.models import Picture

# Create your models here.
class Map(models.Model):
    name = models.CharField(max_length = 30)
    datetime = models.DateField(default = timezone.now)
    gps = models.ForeignKey('Gps', on_delete = models.CASCADE)
    picture = models.ForeignKey('home.Picture', on_delete = models.SET_NULL, null = True)
    zoom = models.FloatField()
    centerX = models.FloatField()
    centerY = models.FloatField()
    
    def __str__(self):
        return self.name

class Gps(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    datetime = models.DateField(default = timezone.now)






