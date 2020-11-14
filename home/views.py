from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps, Map
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
@ensure_csrf_cookie

def home(request):
    return render(request, 'home.html')

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

def delete_map(request, map_id):
    get_map = Map.objects.get(pk=map_id)
    gps = get_map.gps

    data={
        'gps':gps,
    }
    return JsonResponse({'data':data})

def get_map(request):
    pass