from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test),
    path('main', views.maintest),
    path('createpc/', views.createpc),

    path('api/uaconsumer', views.uaconsumer),
    path('api/check_mobile', views.check_mobile),
    path('api/check_regno', views.check_regno),
    path('api/check_num', views.check_num),
    path('api/cons', views.getcons),
    path('api/cards/<id>', views.getcards),
    path('admin/', admin.site.urls),
]
