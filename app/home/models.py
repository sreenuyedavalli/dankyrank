from django.db import models

class Playlist(models.Model):
    user_id = models.CharField(max_length=50)
    playlist_id = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    is_master = models.CharField(max_length=50)

class Group(models.Model):
    group_id = models.CharField(max_length=50)
    name = models.CharField(max_length=100)

class Members(models.Model):
    group_id = models.CharField(max_length=50)
    user_id = models.CharField(max_length=50)
    playlist_id = models.CharField(max_length=50)

class Songs(models.Model):
    artist = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)

class Songlist(models.Model):
    song_id = models.CharField(max_length=50)
    playlist_id = models.CharField(max_length=50)
