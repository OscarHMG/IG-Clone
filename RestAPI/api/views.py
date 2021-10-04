import json

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, authentication_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from datetime import datetime
from .models import *
from .serialiazers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # authentication_classes = TokenAuthentication
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['POST'])
    def create_new_post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'])
    def create_new_postV2(self, request, pk=None):
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
            print('ANTES DE REACTION TEXT')
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

    @action(detail=False, methods=['GET'])
    def get_profile_info(self, request, pk=None):
        try:
            return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('LOL')
        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = {
                'token': token,
                'user': UserSerializer(user).data
            }
            response = Response(response_data, status=status.HTTP_200_OK)

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
