from abc import ABC

from rest_framework import serializers
from account.serializers import UserSerializer
from .models import Tweet

Valid_Action_Options = ['like-action', 'retweet']


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        if not value in Valid_Action_Options:
            raise serializers.ValidationError('You Can\'t Perform That Action')
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    user = UserSerializer(read_only=True)


    class Meta:
        model = Tweet
        fields = ["user", 'id', 'content', 'likes', 'timestamp']

    def validate_content(self, value):
        if len(value) > 400:
            raise serializers.ValidationError("This Tweet Is Too Long")
        return value

    def get_likes(self, value):
        likes = value.likes.count()
        return likes

    def get_id(self, value):
        id = value.id
        return id


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    og_tweet = TweetCreateSerializer(source='parent', read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ["user", 'id', 'content', 'likes', 'is_retweet', 'timestamp', "og_tweet"]

    def get_likes(self, value):
        likes = value.likes.count()
        return likes

    def get_id(self, value):
        id = value.id
        return id

