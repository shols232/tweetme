
from django.urls import path
from . import views

urlpatterns = [
    path('', views.tweet_list_view, name='tweet-list'),
    path('feed/', views.user_feed_view, name='tweet-feed'),
    path('create/', views.create_tweet_view, name='create-tweet'),
    path('<int:tweet_id>/', views.tweet_detail_view, name='tweet-detail'),
    path('action/', views.tweet_action_view, name='tweet-action'),
    path('<int:tweet_id>/delete', views.delete_tweet_view, name='delete-tweet'),


]
