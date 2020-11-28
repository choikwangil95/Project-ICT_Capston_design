from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('signup/mobile', views.signup_mobile, name="signup_mobile"),
    path('login/mobile', views.login_mobile, name="login_mobile"),
]
