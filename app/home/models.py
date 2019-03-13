from django.db import models

class Playlist(models.Model):
    owner = models.ForeignKey(User)
    name = models.CharField(max_length=100)
    spotify_playlist_id = models.CharField(max_length=255)

class Group(models.Model):
    owner = models.ForeignKey(User)
    name = models.CharField(max_length=100)
    master_playlist = models.ForeignKey(Playlist)

class Membership(models.Model):
    group = models.ForeignKey(Group)
    user = models.ForeignKey(User)
    playlist = models.ForeignKey(Playlist)

class Songs(models.Model):
    artist = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
