from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('mobile/', views.home_mobile, name='home_mobile'),
    path('image/<int:map_id>/', views.image, name="image"),
    path('mobile/image/<int:map_id>/', views.image, name="image"),
    path('create_map/', views.create_map, name='createmap'),
    path('mobile/create_map/', views.create_map, name='createmap'),
    path('get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('mobile/get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('now/<int:map_id>/', views.save_now_geolocation, name='nowloc'),
    path('mobile/now/<int:map_id>/', views.save_now_geolocation, name='nowloc'),
    path('get/<int:map_id>/', views.get_map, name='getmap'),
    path('setzoom/<int:map_id>/', views.set_zoom, name='setzoom'),
    path('mobile/setzoom/<int:map_id>/', views.set_zoom, name='setzoom'),
    path('list/<slug:user_name>/', views.show_list, name='showlist'),
    path('mobile/list/', views.show_list_mobile, name='showlistmobile'),
    path('get_userid/<slug:user_name>/', views.get_userid, name='getuserid'),
    path('show_my_map/<int:map_id>', views.show_my_map, name='showmymap'),
]+static("/mobile"+settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
