from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps, Map
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
@ensure_csrf_cookie

def home(request):
    return render(request, 'home.html')

# @ To do
# 1 여행이 시작되는 지도 객체를 생성한 뒤, start전에 입력한 제목이 해당 지도 제목 칼럼에 저장 되어야 함
# 2 해당 지도 pk에 해당하는 gps fk 에 위도, 경도들이 저장되도록 해야 함

def create_map(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data['title']

        new_map = Map.objects.create(
            name = name,
        )
        map_id = new_map.pk
        
        data={
            'map_id' : map_id 
        }

        return JsonResponse({'data':data})

def save_now_geolocation(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        latitude = data['latitudeValue']
        longitude = data['lngitudeValue']
        
        gps = Gps.objects.create(
            latitude = latitude,
            longitude = longitude,
        )
        
        return HttpResponse('complete save')

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
def get_map(request, map_id):
    pass