from django.db import models
from django.contrib.auth.models import AbstractUser
# from tracking.models import Map
from home.models import Map

# Create your models here.
class User(AbstractUser):
    map = models.ForeignKey('home.Map', on_delete = models.SET_NULL, null = True)

    def __str__(self):
        return self.username