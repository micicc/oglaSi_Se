from django.forms import ModelForm
from .models import Kategorija, Oglas, Komentar


class KategorijaForm(ModelForm):
    class Meta:
        model = Kategorija
        fields = ['naziv']


class OglasForm(ModelForm):
    class Meta:
        model = Oglas
        fields = ['naslov', 'opis', 'mesto']


class KomentarForm(ModelForm):
    class Meta:
        model = Komentar
        fields = ['ocena', 'tekst']
