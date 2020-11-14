from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create_map/', views.create_map, name='createmap'),
    path('now/', views.save_now_geolocation, name='nowloc'),
    path('delete/<int:map_id>', views.delete_map, name='delmap'),
    path('get/<int:map_id>', views.get_map, name='getmap'),
]
