from django.urls import path
from .import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns =[
    path('register/', views.api_register_view, name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('profile/<str:username>/', views.profile_view, name='profile'),
    path('profile/<str:username>/edit/', views.profile_update_view, name='profile-edit'),
    path('profile/<str:username>/follow/', views.follow_unfollow_view, name='follow'),
    path('logout/', views.Logout.as_view(), name='logout')
]