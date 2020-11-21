from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('new_route/', views.new_route, name='newroute'),
    path('new_route/create_map/', views.create_map, name='createmap'),
    path('get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('now/<int:map_id>/', views.save_now_geolocation, name='nowloc'),
    path('delete/<int:map_id>/', views.delete_map, name='delmap'),
    path('get/<int:map_id>/', views.get_map, name='getmap'),
    path('setzoom/<int:map_id>/', views.set_zoom, name='setzoom'),
    path('list/', views.show_list, name='showlist'),
]
