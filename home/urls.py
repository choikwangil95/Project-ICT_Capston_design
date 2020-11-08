from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('now/', views.save_now_geolocation, name='nowloc'),
]
