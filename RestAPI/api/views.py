import json

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from datetime import datetime
from .models import *
from .serialiazers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, BasePermission


# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # authentication_classes = TokenAuthentication
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['POST'])
    def create_new_post(self, request, pk=None):
        try:
            user = request.user
            print(request.data['description'])
            post = Post.objects.create(user=user, description=request.data['description'])
            post.save()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    #En realidad este crea comentarios
    @action(detail=True, methods=['POST'])
    def create_new_comments_in_post(self, request, pk=None):
        try:
            user = request.user
            post = Post.objects.get(id=pk)
            Comments.objects.create(user=user, comment_text=request.data['comment_text'], post_comment=post)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET'])
    def get_post_by_id(self, request, pk=None):
        queryset = Post.objects.all()
        post_response = get_object_or_404(queryset, pk=pk)
        serializer = PostSerializer(post_response)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def create_update_reaction_post(self, request, pk=None):
        user = User.objects.get(id=1)
        post = Post.objects.get(id=pk)
        # print('POST', json.dumps(post.__dict__))
        try:
            reaction_user = Reactions.objects.get(post_reaction=post, user=user)
            # Existe, entonces actualizo.
            reaction_user.reaction_text = request.data['reaction_text']
            reaction_user.modification_date = datetime.now()
            reaction_user.save()
        except Exception:
            # Reactions.objects.create(user=user, reaction_text='like', post_reaction=post)
            Reactions.objects.create(user=user, reaction_text=request.data['reaction_text'], post_reaction=post)

        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_post_by_user(self, request):
        user = request.user
        posts = Post.objects.filter(user=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'])
    def get_comments(self, request, pk=None):
        post = Post.objects.get(id=pk)
        comments = Comments.objects.filter(post_comment=post)

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


class ReactionViewSet(viewsets.ModelViewSet):
    queryset = Reactions.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # authentication_classes = []
    # permission_classes = [AllowAny]

    @action(detail=False, methods=['GET'])
    def get_profile_info(self, request, pk=None):
        try:
            return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['POST'])
    def create_new_user(self, request, *args, **kwargs):
        user = User.objects.create(
            username=request.data['username'],
            email=request.data['email'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name']
        )

        user.set_password(request.data['password'])
        user.save()

        return Response(status=status.HTTP_200_OK)


class AllUsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['GET'])
    def get_profile_infoV2(self, request, pk=None):

        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CommentsNoAuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['GET'])
    def get_post_by_userV2(self, request, pk=None):

        try:
            user = User.objects.get(id=pk)
            posts = Post.objects.filter(user=user)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
