from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import *

routers = routers.DefaultRouter()
routers.register('users', UserViewSet)
routers.register('posts', PostViewSet)
routers.register('comments', CommentViewSet)
routers.register('register', RegisterViewSet)
routers.register('allUsers', AllUsersViewSet)
routers.register('profile', PerfilViewSet)
routers.register('profileComments', CommentsNoAuthViewSet)
urlpatterns = [
    path('', include(routers.urls))

]