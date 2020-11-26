from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('new_route/image/<int:map_id>/', views.image, name="image"),
    path('new_route/', views.new_route, name='newroute'),
    path('new_route/create_map/', views.create_map, name='createmap'),
    path('new_route/get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('new_route/now/<int:map_id>/',
         views.save_now_geolocation, name='nowloc'),
    path('new_route/get/<int:map_id>/', views.get_map, name='getmap'),
    path('new_route/setzoom/<int:map_id>/', views.set_zoom, name='setzoom'),
    path('list/', views.show_list, name='showlist'),
    path('show_my_map/<int:map_id>', views.show_my_map, name='showmymap'),
]+static("new_route"+settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
