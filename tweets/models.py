from django.db import models
import random
from django.conf import settings
User = settings.AUTH_USER_MODEL
from django.db.models import Q

class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        users_being_followed_ids_list = []
        if user.following.exists():
            users_being_followed_ids_list = user.following.values_list('user__id', flat=True)
        return self.filter(Q(user__id__in=users_being_followed_ids_list) | Q(user=user)).distinct().order_by('-timestamp')

class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)
    def feed(self, user):
        return self.get_queryset().feed(user)

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='tweet_likes', blank=True, through=TweetLike)
    image = models.FileField(upload_to='image/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()

    class Meta:
        ordering = ('-id', )

    def serialize(self):
        return {'id': self.id, 'content': self.content, 'likes': random.randint(0,500)}

    def __str__(self):
        return self.id

    @property
    def is_retweet(self):
        return self.parent != None