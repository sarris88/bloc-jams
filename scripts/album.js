var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumFeat = {
     title: 'Waiting for Columbus',
     artist: 'Little Feat',
     label: 'Warner Bros. Records',
     year: '1979',
     albumArtUrl: 'assets/images/Littlefeat.png',
     songs: [
         { title: 'Spanish Moon', duration: '7:35' },
         { title: 'Eldorado Slim', duration: '12:45' },
         { title: 'Old Folks Boogie', duration: '5:55'},
         { title: 'Feats DOnt Fail Me Now', duration: '6:32' },
         { title: 'Dixie Chicken', duration: '3:15'}
     ]
 };

 var currentlyPlayingSong = null;

 var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

  var $row = $(template);
  var clickHandler = function() {
    var songNumber = $(this).attr('data-song-number');

    if(currentlyPlayingSong){
      var currentlyPlayingCell  = $('.song-item-number[data-song number= " ' + currentlyPlayingSong + '"]');
      currentlyPlayingCell.html(currentlyPlayingSong);
    }

    if(currentlyPlayingSong !== songNumber){
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
    } else {
      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
    }
  }

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');
    if(songNumber !== currentlyPlayingSong){
      songNumberCell.html(playButtonTemplate);
    }
    };

    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');
      if(songNumber !== currentlyPlayingSong){
        songNumberCell.html(songNumber);
      }

    };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
};

var setSong = function(songNumber) {
  currentlyPlayingSong = parseInt(songNumber);
  //Use buzz library to set new .sound to song from songnumber
}

var setCurrentAlbum = function(album) {
  var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

 $albumTitle.text(album.title);
 $albumArtist.text(album.artist);
 $albumReleaseInfo.text(album.year + ' ' + album.label);
 $albumImage.attr('src', album.albumArtUrl);

   $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
     }
 };

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span"></span></a>';

var currentlyPlayingSong = null;

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);

  });
