from rest_framework import serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('id','username', 'email', 'password', 'first_name', 'last_name')
        # fields = ('id', 'username', 'password')
        # fields = '__all__'
        # read_only_fields = ('is_active', 'is_staff', 'id', 'last_login', 'is_superuser', 'date_joined', 'groups', 'user_permissions')
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    #def create(self, request, *args, **kwargs):
        #print('YIKES!')
        #serializer = UserSerializer(data=request.data)
        #serializer.is_valid(raise_exception=True)
        #serializer.save()
        #return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print('XXX')
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

        print('NOPE')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Post
        fields = ('id', 'description', 'user', 'register_date', 'number_comments', 'number_reactions')


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Comments
        fields = ('id', 'comment_text', 'post_comment', 'user', 'register_date')


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reactions
        fields = ('id', 'reaction_text', 'post_reaction', 'user', 'register_date')
