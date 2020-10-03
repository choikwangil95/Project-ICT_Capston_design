from django.urls import path
from . import views

urlpatterns = [
    path('', views.tracking, name='tracking'),
]
