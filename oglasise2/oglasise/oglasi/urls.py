from django.urls import path
from . import views

app_name = 'oglasi_app'

urlpatterns = [
    path('', views.svi_oglasi, name='svi_oglasi'),
    path('kategorije/', views.kategorje, name='kategorije'),
    path('komentari/', views.komentari, name='komentari'),
]