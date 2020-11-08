from django.shortcuts import render
from django.http import HttpResponse
from .models import Gps

def home(request):
    return render(request, 'home.html')

def save_now_geolocation(request):
    if request.method == 'POST':
        latitude = request.POST.get('latitudeValue',False)
        longitude = request.POST.get('lngitudeValue',False)
        gps = Gps.objects.create(
            latitude = latitude,
            longitude = longitude,
        )
        return HttpResponse('complete save')