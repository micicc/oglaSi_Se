from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, permission_required
from .models import Oglas, Kategorija, Komentar
from .forms import OglasForm
from django.http import JsonResponse

def svi_oglasi(req):
    oglasi = Oglas.objects.all()


    labels = []
    data = []

    for o in oglasi:
        if not o.mesto in labels:
            labels.append(o.mesto)

    for m in labels:
        i = 0;
        for o in oglasi:
            if o.mesto == m:
                i += 1
        data.append(i)

    return render(req, 'svi_oglasi.html', {'oglasi': oglasi, 'labels': labels, 'data': data})


def kategorje(req):
    labels = []
    data = []

    kategorije = Kategorija.objects.all()
    oglasi = Oglas.objects.all()
    for k in kategorije:
        labels.append(k.naziv)
        i = 0
        for o in oglasi:
            if o.kategorija_id == k.id:
                i+=1
        data.append(i)

    return render(req, 'kategorije.html', {'labels': labels,'data': data, 'kategorije': kategorije})

def komentari(req):
    labels = []
    data = []

    kom = Komentar.objects.all()
    ogl = Oglas.objects.all()
    for o in ogl:
        labels.append(o.naslov)
        i = 0
        for k in kom:
            if k.oglas_id == o.id:
                i = i+1
        data.append(i)

    return render(req, 'komentari.html', {'labels': labels,'data': data,'komentari': kom})

def home(request):
    return render(request, 'home.html')

