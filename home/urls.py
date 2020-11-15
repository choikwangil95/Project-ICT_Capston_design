from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create_map/', views.create_map, name='createmap'),
    path('get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('now/<int:map_id>/', views.save_now_geolocation, name='nowloc'),
    path('delete/<int:map_id>/', views.delete_map, name='delmap'),
    path('get/<int:map_id>/', views.get_map, name='getmap'),
    path('setzoom/',views.set_zoom,name='setzoom'),
    path('setcenter/',views.set_center,name='setcenter'),
]
