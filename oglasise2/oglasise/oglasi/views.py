from django.shortcuts import render, get_object_or_404
from .models import Oglas, Kategorija, Komentar
from django.contrib.auth import get_user_model
from .forms import KategorijaForm


def svi_oglasi(req):
    oglasi = Oglas.objects.all()
    labels = []
    data = []

    for o in oglasi:
        if not o.mesto in labels:
            labels.append(o.mesto)

    for m in labels:
        i = 0
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

    if req.method == 'POST':
        forma = KategorijaForm(req.POST)

        if forma.is_valid():
            m = Kategorija(naziv=forma.cleaned_data['naziv'])
            m.save()
            return render(req, 's_add.html')
        else:
            return render(req, 'kategorije.html',{'labels': labels, 'data': data, 'kategorije': kategorije, 'form': forma})
    else:
        forma = KategorijaForm()
        return render(req, 'kategorije.html', {'labels': labels, 'data': data, 'kategorije': kategorije, 'form': forma})


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

def korisnici(req):
    labels = []
    data = []
    data2 = []
    User = get_user_model()
    users = User.objects.all()
    kom = Komentar.objects.all()
    ogl = Oglas.objects.all()

    for u in users:
        labels.append(u.username)
        i = 0
        oc = 0
        br = 0
        for o in ogl:
            if o.korisnik_id == u.id:
                i = i+1
                for k in kom:
                    if k.oglas_id == o.id:
                        br += 1
                        oc += k.ocena
        data.append(i)
        if not br == 0:
            data2.append(oc/br)

    return render(req, 'korisnici.html', {'labels': labels,'data': data,'korisnici': users, 'data2': data2})

def oglas(req, id):
    tmp = get_object_or_404(Oglas, id=id)
    txt = ("oglas id: " + str(tmp.id))
    kom = Komentar.objects.filter(oglas_id = id)
    brkom = 0
    zocena = 0
    labels = [1, 2, 3, 4, 5]
    data = []

    for k in kom:
        brkom += 1
        zocena += k.ocena
    pocena = 0
    if not brkom==0:
        pocena = zocena/brkom

    for le in labels:
        i = 0
        for k in kom:
            if k.ocena == le:
                i+=1
        data.append(i)

    return render(req, 'oglas.html', {'oglas': tmp, 'page_title': txt, 'pocena': pocena, 'komentari':kom, 'labels': labels,'data': data})


def del_kategorija(req, id):
    k = get_object_or_404(Kategorija, id=id)
    k.delete()
    return render(req, 's_delete.html', {})

def edit_kategorija(req, id):
    labels = []
    data = []

    kategorije = Kategorija.objects.all()
    oglasi = Oglas.objects.all()
    for k in kategorije:
        labels.append(k.naziv)
        i = 0
        for o in oglasi:
            if o.kategorija_id == k.id:
                i += 1
        data.append(i)

    if req.method == 'POST':
        forma = KategorijaForm(req.POST)

        if forma.is_valid():
            m = Kategorija.objects.get(id=id)
            m.naziv = forma.cleaned_data['naziv']
            m.save()
            return render(req, 's_edit.html')
        else:
            return render(req, 'kategorije.html',
                          {'labels': labels, 'data': data, 'kategorije': kategorije, 'form': forma, 'id': id})
    else:
        tmp = get_object_or_404(Kategorija, id=id)
        forma = KategorijaForm(instance=tmp)
        return render(req, 'kategorije.html',
                      {'labels': labels, 'data': data, 'kategorije': kategorije, 'form': forma, 'id': id})
