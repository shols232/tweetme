from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.conf import settings


class Follow(models.Model):
    the_follower = models.ForeignKey(User, on_delete=models.CASCADE)
    the_followed = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    date_joined = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)
    last_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
