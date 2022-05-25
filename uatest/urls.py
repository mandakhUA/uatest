from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test),
    path('main', views.maintest),
    path('createpc/', views.createpc),



    path('api/cons', views.getcons),
    path('api/cards/<id>', views.getcards),
    path('admin/', admin.site.urls),
]
