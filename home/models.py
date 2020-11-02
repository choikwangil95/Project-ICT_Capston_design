from django.db import models
from django.utils import timezone

# Create your models here.
class Picture(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    datetime = models.DateField(default = timezone.now)