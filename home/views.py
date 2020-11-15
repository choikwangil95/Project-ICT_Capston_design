from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps, Map
import json
import math
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Max, Min
@ensure_csrf_cookie

def home(request):
    return render(request, 'home.html')

# @ To do
# 1 여행이 시작되는 지도 객체를 생성한 뒤, start전에 입력한 제목이 해당 지도 제목 칼럼에 저장 되어야 함
# 2 해당 지도 pk에 해당하는 gps fk 에 위도, 경도들이 저장되도록 해야 함

def get_map(request, map_title):
    name = map_title
    map_id = Map.objects.get(name=name).pk

    data={
        'map_id' : map_id 
    }

    return JsonResponse({'data':data})

def create_map(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data['title']

        new_map = Map.objects.create(
            name = name,
        )

        data={}

        return JsonResponse({'data':data})

def save_now_geolocation(request, map_id):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        latitude = data['latitudeValue']
        longitude = data['lngitudeValue']
        set_map = Map.objects.get(pk=map_id)
        
        gps = Gps.objects.create(
            map_id = set_map,
            latitude = latitude,
            longitude = longitude,
        )
        
        return HttpResponse('complete save')

def set_zoom(request):
    # if request.method == 'POST':
    maxlat = Gps.objects.aggregate(Max('latitude'))
    minlat = Gps.objects.aggregate(Min('latitude'))
    maxlon = Gps.objects.aggregate(Max('longitude'))
    minlon = Gps.objects.aggregate(Min('longitude'))
    lat = list(maxlat.values())[0] - list(minlat.values())[0]
    lon = list(maxlon.values())[0] - list(minlon.values())[0]
    zoom_dec = max(lat,lon)
    # zoom = 20 - round(round(zoom_dec/1128.497220)**(1/2)) -5
    zoom = round(math.log(360)/zoom_dec/math.log(2))
    print(zoom_dec)
    return JsonResponse({'zoom':zoom})

# To do
# 새로운 여행 시작 및 여행 목록 클릭 시 지도에 표시된 마커와 선이 모두 지워져야 함
def delete_map(request, map_id):
    get_map = Map.objects.get(pk=map_id)
    gps = get_map.gps

    data={
        'gps':gps,
    }
    return JsonResponse({'data':data})

# To do 특정 map_id에 해당하는 model에서 위도, 경도를 가져와서 마커와 선 표시해줘야 함