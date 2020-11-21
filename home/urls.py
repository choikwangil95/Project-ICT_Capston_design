from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('create_map/', views.create_map, name='createmap'),
    path('get_mapid/<slug:map_title>/', views.get_map, name='getmap'),
    path('now/<int:map_id>/', views.save_now_geolocation, name='nowloc'),
    path('get/<int:map_id>/', views.get_map, name='getmap'),
    path('setzoom/<int:map_id>/',views.set_zoom,name='setzoom'),
    path('image/<int:map_id>/', views.image, name="image"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
