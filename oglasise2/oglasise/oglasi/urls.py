from django.urls import path
from . import views

app_name = 'oglasi_app'

urlpatterns = [
    path('', views.svi_oglasi, name='svi_oglasi'),
    path('kategorije/', views.kategorje, name='kategorije'),
    path('komentari/', views.komentari, name='komentari'),
    path('korisnici/', views.korisnici, name='korisnici'),
    path('oglas/<int:id>', views.oglas, name='oglas'),
    path('del_kategorija/<int:id>', views.del_kategorija, name='del_kategorija'),
    path('edit_kategorija/<int:id>', views.edit_kategorija, name='edit_kategorija'),
]