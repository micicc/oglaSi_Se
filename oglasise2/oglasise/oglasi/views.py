from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, permission_required
from .models import Oglas
from .forms import OglasForm

def svi_oglasi(req):
    tmp = Oglas.objects.all()
    return render(req, 'svi_oglasi.html', {'oglasi': tmp})
