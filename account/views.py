from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import RegistrationSerializer, UserProfileSerializer, UserProfileUpdateSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .models import UserProfile
from django.contrib.auth.models import User


@api_view(['POST', ])
@permission_classes([AllowAny, ])
def api_register_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        account = serializer.save()
        data['token'] = Token.objects.get(user=account).key
    else:
        data['errors'] = serializer.errors
    return Response(data)


class Logout(APIView):
    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=200)


@api_view(['GET', ])
def profile_view(request, username, *args, **kwargs):
    profile = UserProfile.objects.filter(user__username=username)
    if profile.exists():
        serializer = UserProfileSerializer(profile.first())
        return Response(serializer.data, status=200)
    return Response(status=400)


@api_view(['GET', 'POST'])
def follow_unfollow_view(request, username, *args, **kwargs):
    user = request.user
    profile_qs = UserProfile.objects.filter(user__username=username)
    profile = profile_qs.first()
    print(request.data)
    data = request.data or None
    if user is not profile:
        if data:
            if data.get('action') == 'follow':
                profile.followers.add(user)
            elif data.get('action') == 'unfollow':
                profile.followers.remove(user)
            else:
                pass
            return Response({"count": profile.followers.count()}, status=200)


@api_view(['POST'])
def profile_update_view(request, username, *args, **kwargs):
    profile_qs = UserProfile.objects.filter(user__username=request.user.username)
    print(request.user)
    user_qs = User.objects.filter(username=request.user.username)
    if profile_qs.exists() and user_qs.exists():
        profile = profile_qs.first()
        user = user_qs.first()
        print(user)
        serializer = UserProfileUpdateSerializer(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            username_ = serializer.validated_data.get('username')
            print(username_)
            username = username_
            user.username = username
            user.save()
            serializer.save()
            return Response(serializer.data, status=200)
    return Response(status=404)


