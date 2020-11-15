from django.db import models
from django.utils import timezone

# Create your models here.
class Map(models.Model):
    name = models.CharField(max_length = 30)
    datetime = models.DateField(default = timezone.now)
    gps = models.ForeignKey('Gps', on_delete = models.CASCADE, null = True)
    picture = models.ForeignKey('Picture', on_delete = models.SET_NULL, null = True)
    zoom = models.FloatField(null = True)
    centerX = models.FloatField(null = True)
    centerY = models.FloatField(null = True)
    
    def __str__(self):
        return self.name

class Gps(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    datetime = models.DateField(default = timezone.now)

    # def save(self, *args, **kwargs):


class Picture(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    datetime = models.DateField(default = timezone.now)