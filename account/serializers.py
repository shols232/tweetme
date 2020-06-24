from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'followers_count', 'following_count']

    def get_followers_count(self, user):
        return user.profile.followers.count()

    def get_following_count(self, user):
        return user.following.count()

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    class Meta:
        model = UserProfile
        fields = ['username', 'bio', 'user']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ['id', 'bio', 'date_joined', 'user']

    def validate_user(self, value):
        if len(value.user.username) == 0:
            raise serializers.ValidationError('username cannot be empty')
        if len(value.user.username) <5:
            raise serializers.ValidationError('username must be greater than 4 characters')
        return value


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords don\'t match'})

        user = User.objects.create_user(

            email=self.validated_data['email'],
            username=self.validated_data['username']
        )

        user.set_password(password)
        user.save()
        return user


# class RegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.SerializerMethodField(write_only=True)
#     class Meta:
#         model = User
#         fields = ('username', 'password')