from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.views.generic import TemplateView
from tweets import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('tweets/create/', views.create_tweet_view, name='create-tweet'),
    path('tweets/<int:tweet_id>/', views.tweet_detail_view, name='tweet-detail'),
    # path('api/tweets/action/', views.tweet_action_view, name='tweet-action'),
    # path('api/tweets/<int:tweet_id>/delete', views.delete_tweet_view, name='delete-tweet'),
    path('tweets/', views.tweet_list_view, name='tweet-list'),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html'), name='tweet-list'),
    # path('rest-auth/', include('rest_auth.urls')),
     path('djoser-rest-auth/', include('djoser.urls')),
    # path('djoser-rest-auth/', include('djoser.urls.jwt')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/tweets/', include("tweets.urls")),
    path('api/account/', include("account.urls"))

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
