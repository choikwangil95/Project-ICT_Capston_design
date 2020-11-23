from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps, Map, Picture
import json
import math
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max, Min
from PIL import Image
from PIL.ExifTags import TAGS
from django.conf import settings
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

def set_zoom(request, map_id):
    maxlat = Gps.objects.all().filter(map_id = map_id).aggregate(Max('latitude'))
    minlat = Gps.objects.all().filter(map_id = map_id).aggregate(Min('latitude'))
    maxlon = Gps.objects.all().filter(map_id = map_id).aggregate(Max('longitude'))
    minlon = Gps.objects.all().filter(map_id = map_id).aggregate(Min('longitude'))
    lat = list(maxlat.values())[0] - list(minlat.values())[0]
    lon = list(maxlon.values())[0] - list(minlon.values())[0]
    zoom_dec = max(lat,lon)
    zoom = round(math.log(360 / zoom_dec)/math.log(2))
    # zoom = 15

    middlelat = (list(maxlat.values())[0] + list(minlat.values())[0])/2
    middlelon = (list(maxlon.values())[0] + list(minlon.values())[0])/2
   
    return JsonResponse({'zoom':zoom,'middlelat':middlelat,'middlelon':middlelon})

@csrf_exempt
def image(request, map_id):
    set_map = Map.objects.get(pk=map_id)

    if request.method == 'POST':
        images = request.FILES.getlist('image')
        
        data={}

        if images:
            i=0
            for img in images:
                Picture.objects.create(
                    map_id = set_map,
                    image = img,
                )
                Lat, Lon = extractData(img)
                pic = Picture.objects.get(image=img)
                pic.latitude=Lat
                pic.longitude=Lon
                pic.save()

            maxlat = Gps.objects.all().filter(map_id = map_id).aggregate(Max('latitude'))
            minlat = Gps.objects.all().filter(map_id = map_id).aggregate(Min('latitude'))
            maxlon = Gps.objects.all().filter(map_id = map_id).aggregate(Max('longitude'))
            minlon = Gps.objects.all().filter(map_id = map_id).aggregate(Min('longitude'))

            for img in images:
                Lat, Lon = extractData(img)
                if( Lat <= maxlat.get("latitude__max") and Lat >= minlat.get("latitude__min") and Lon <= maxlon.get("longitude__max") and Lon >= minlon.get("longitude__min")):
                    dataSet = {
                        i:{
                            'image' : str(img),
                            'lat' : Lat,
                            'lng' : Lon
                        }
                    }
                    data.update(dataSet)
                    i=i+1
                
    return JsonResponse({'data':data})

def extractData(img):
    media_path = settings.MEDIA_ROOT
    image = Image.open(media_path+"\\"+str(img))
    # 새로운 딕셔너리 생성
    taglabel = {}

    info = image._getexif()
    image.close()

    for tag, value in info.items():
        decoded = TAGS.get(tag, tag)
        taglabel[decoded] = value

    exifGPS = taglabel['GPSInfo']
    latData = exifGPS[2]
    lonData = exifGPS[4]

    # 도, 분, 초 계산
    latDeg = latData[0]
    latMin = latData[1]
    latSec = latData[2]
    lonDeg = lonData[0]
    lonMin = lonData[1]
    lonSec = lonData[2]

    # 도 decimal로 나타내기
    # 위도 계산
    Lat = (latDeg + (latMin + latSec / 60.0) / 60.0)
    # 북위, 남위인지를 판단, 남위일 경우 -로 변경
    if exifGPS[1] == 'S': Lat = Lat * -1
    # 경도 계산
    Lon = (lonDeg + (lonMin + lonSec / 60.0) / 60.0)
    # 동경, 서경인지를 판단, 서경일 경우 -로 변경
    if exifGPS[3] == 'W': Lon = Lon * -1

    return Lat, Lon