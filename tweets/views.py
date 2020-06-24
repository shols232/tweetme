from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.utils.http import is_safe_url
from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


@api_view(['GET', ])
def tweet_list_view(request):
    username = request.GET.get('username')
    qs = Tweet.objects.all()
    if username is not None:
        print('olalolol')
        print(username)
        qs = Tweet.objects.filter(user__username=username)
        print(qs)
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_tweets = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_tweets, many=True)
    print(serializer.data)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET', ])
def user_feed_view(request):
    user = request.user
    feed = Tweet.objects.feed(user)
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_tweets_feed = paginator.paginate_queryset(feed, request)
    serializer = TweetSerializer(paginated_tweets_feed, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET', ])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    tweet = Tweet.objects.filter(id=tweet_id)
    if not tweet.exists():
        return Response({}, status=404)
    obj = tweet.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data)


@permission_classes([IsAuthenticated, ])
@api_view(['POST', ])
def create_tweet_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.data, status=400)


@permission_classes([IsAuthenticated, ])
@api_view(['DELETE', 'POST'])
def delete_tweet_view(request, tweet_id, *args, **kwargs):
    tweet = Tweet.objects.get(id=tweet_id)

    if not (tweet.user == request.user):
        return Response({"You Can Not Delete That Post"}, status=401)
    tweet.delete()
    return Response({"Tweet Was Successfully Deleted"}, status=200)


@permission_classes([IsAuthenticated, ])
@api_view(['POST'])
def tweet_action_view(request, *args, **kwargs):
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = request.user
        tweet_id = serializer.validated_data.get('id')
        action = serializer.validated_data.get('action')
        content = serializer.validated_data.get('content')
        try:
            tweet = Tweet.objects.get(id=tweet_id)
        except Tweet.DoesNotExist:
            return Response({}, status=404)
        if action == 'like-action':
            if request.user in tweet.likes.all():
                print('unliked')
                tweet.likes.remove(user)
                data = {"likes": tweet.likes.count(), "id": tweet.id, "isLiked": False}
                return Response(data, status=200)
            else:
                data = {}
                tweet.likes.add(user)
                serializer = TweetSerializer(tweet)
                data["likes"] = tweet.likes.count()
                data["id"] = tweet.id
                data["isLiked"] = True
                return Response(data, status=200)
        elif action == 'retweet':
            parent_obj = tweet
            new_tweet = Tweet.objects.create(user=user, content=content, parent=parent_obj)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)

        return Response({}, status=200)


def create_tweet_view_pure_django(request, *args, **kwargs):
    form = TweetForm(request.POST) or None
    next_url = request.POST.get('next') or None
    user = request.user
    if not user.is_authenticated:
        if request.is_ajax():
            return JsonResponse({}, status=403)
        return redirect(settings.LOGIN_URL)
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related validation here
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)

        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={'form': form})


def tweet_list_view_pure_django(request):
    qs = Tweet.objects.all()
    tweets = [x.serialize() for x in qs]
    data = {'isUser': False, 'response': tweets}
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    try:
        tweet = Tweet.objects.get(id=tweet_id)
        data = {
            'id': tweet_id,
            'content': tweet.content,

        }
        status = 200
    except Tweet.DoesNotExist:
        data = {
            'status': 404
        }
        status = 404

    return JsonResponse(data, status=status)
