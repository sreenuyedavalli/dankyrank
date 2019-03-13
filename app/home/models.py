from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    artist = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)

class Playlist(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    spotify_playlist_id = models.CharField(max_length=255)

class Group(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    master_playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)

class Membership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
