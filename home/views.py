from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps, Map
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
@ensure_csrf_cookie

def home(request):
    return render(request, 'home.html')

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

# To do
# 1 새로운 여행 시작 및 여행 목록 클릭 시 지도에 표시된 마커와 선이 모두 지워져야 함
def delete_map(request, map_id):
    get_map = Map.objects.get(pk=map_id)
    gps = get_map.gps

    data={
        'gps':gps,
    }
    return JsonResponse({'data':data})

# 2 특정 map_id에 해당하는 model에서 위도, 경도를 가져와서 마커와 선 표시해줘야 함