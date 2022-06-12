from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test),
    path('con', views.contest),
    path('card', views.cardtest),
    path('receipt', views.receipttest),
    path('cardlist', views.cardlist),


    path('api/receipt', views.receipt),
    path('api/return', views.retrn),
    path('api/sendurl/<func_name>', views.sendurl),
    path('api/check_mobile', views.check_mobile),    
    path('api/check_regno', views.check_regno),
    path('api/check_num', views.check_num),
    path('api/check_token', views.check_token),
    path('api/check_fam', views.check_fam),
    path('api/check_billno', views.check_billno),
    path('api/check_receipt', views.check_receipt),
    path('api/cons', views.getcons),
    path('api/card', views.getcard),
    path('admin/', admin.site.urls),
]