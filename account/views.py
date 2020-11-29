from django.shortcuts import render, redirect
from .models import User
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['confirm']:
            user = User.objects.create_user(username=request.POST['username'],
                                            password=request.POST['password'])
            auth.login(request, user)
            return redirect('login')
    return render(request, 'signup.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')


def logout(request):
    if request.method == 'GET':
        auth.logout(request)
        return redirect('login')

def signup_mobile(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['confirm']:
            user = User.objects.create_user(username=request.POST['username'],
                                            password=request.POST['password'])
            auth.login(request, user)
            return redirect('login_mobile')
    return render(request, 'signup--mobile.html')


def login_mobile(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('home_mobile')
        else:
            return render(request, 'login--mobile.html')
    else:
        return render(request, 'login--mobile.html')

def logout_mobile(request):
    if request.method == 'GET':
        auth.logout(request)
        return redirect('home_mobile')