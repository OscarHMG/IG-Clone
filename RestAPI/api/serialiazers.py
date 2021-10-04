from rest_framework import serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

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
