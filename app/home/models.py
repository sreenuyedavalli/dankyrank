from django.contrib.auth.models import User
from django.db import models


class Song(models.Model):
    artist = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)


class Playlist(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    spotify_playlist_id = models.CharField(max_length=255)
    songs = models.ManyToManyField(Song, through="home.PlaylistSong", related_name="playlists")


class PlaylistSong(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    rank = models.PositiveIntegerField()


class Group(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    master_playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)

    def dank_rank(self, playlist):
        """
        Regenerates master playlist using all connected playlists. The passed-in playlist will be re-synchronized
        from Spotify before the new master playlist is generated. This means that users can add/remove songs from
        their personal playlist, then when they finish, they need to explicitly click "Update" in the UI to cause
        the master playlist to be regenerated.
        :param playlist: the playlist to re-sync before updating the master playlist
        """
        pass


class Membership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
