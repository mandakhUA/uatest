from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test),
    path('main', views.maintest),
    path('main1', views.maintest1),
    path('createpc/', views.createpc),

    path('api/sendurl/<func_name>', views.sendurl),
    path('api/check_mobile', views.check_mobile),
    path('api/check_regno', views.check_regno),
    path('api/check_num', views.check_num),
    path('api/check_token/<token>', views.check_token),
    path('api/check_fam', views.check_fam),
    path('api/cons', views.getcons),
    path('api/cards/<id>', views.getcards),
    path('admin/', admin.site.urls),
]
