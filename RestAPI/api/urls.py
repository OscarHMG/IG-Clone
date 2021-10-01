from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include

routers = routers.DefaultRouter()
urlpatterns = [
    path('', include(routers.urls)),
]