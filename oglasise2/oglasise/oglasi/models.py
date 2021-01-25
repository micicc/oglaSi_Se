from django.db import models
from django.contrib.auth.models import User

class Kategorija (models.Model):
    datumDodavanja = models.DateTimeField(auto_now_add=True)
    datumIzmene = models.DateTimeField(auto_now=True)
    naziv = models.CharField(max_length=30)


class Oglas (models.Model):
    naslov = models.CharField(max_length=30)
    kategorija = models.ForeignKey(Kategorija, on_delete=models.CASCADE)
    opis = models.CharField(max_length=120)
    mesto = models.CharField(max_length=30)
    datumDodavanja = models.DateTimeField(auto_now_add=True)
    datumIzmene = models.DateTimeField(auto_now=True)
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE)


class Komentar (models.Model):
    datumDodavanja = models.DateTimeField(auto_now_add=True)
    datumIzmene = models.DateTimeField(auto_now=True)
    ocena = models.IntegerField()
    tekst = models.CharField(max_length=100)
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE)
    oglas = models.ForeignKey(Oglas, on_delete=models.CASCADE)



