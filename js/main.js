$(function() {
  ///////////////////////////////////////////////////////////window bar click
  //窗口栏
  //
  var fs = require("fs");
  var http = require("http");
  var async = require("async");

  if (typeof require != "undefined") {

    var nw = require('nw.gui');

    var win = nw.Window.get();

    win.isMaximized = false;

    win.setMinimumSize(950, 550);

    $("#min").click(function() {
      win.minimize();
    });

    $("#max").click(function() {
      console.log($(window).width() + ":" + screen.width);
      if ($(window).width() >= screen.width-5) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    });

    $("#close").click(function() {
      win.close();
    });


    win.on('maximize', function() {
      win.isMaximized = true;
    });

    win.on('unmaximize', function() {
      win.isMaximized = false;
    })

    win.on('loaded', function() {


    });

    window.onkeydown = function(evt) {
      if (evt.which == 116) {
        window.location.reload(true)
      }
      if (evt.which == 123) {
        win.showDevTools();
      }
    }

  }
  ////////////////////////////////////////////////////////////your code

  var audioPlayer = new MyAudio("http://xiebaochun.github.io/music-resource/");

  var playback = new Playback(audioPlayer);

  //add time upate event handler
  audioPlayer.addEvent("timeupdate", function() {
    playback.updateTimeData();
    playback.updateCurPosition();
  });

  setTimeout(function() {
    $("#loader").fadeOut();
  }, 100);

  loadMusics();

  ////////////////////////////////////////////////////////////nav left event
  $("#baidu-music-box").click(function() {
    // $('.main_view').load('http://www.baidu.com'); // SERIOUSLY!
    // window.location.href = "http://play.baidu.com/";
    // $.ajax({
    //   url: 'http://www.baidu.com/',
    //   type: 'GET',
    //   success: function(res) {
    //     // var headline = $(res.responseText).find('a.tsh').text();
    //     // alert(headline);
    //     console.log(res);
    //   }
    // });
    loadMusics();

    // Works with $.get too!
  });

  //$(window).resize(playback.updateCurPosition(audioPlayer));

  /*
  windows resize handler
   */
  win.on("resize", function(w, h) {
    playback.updateCurPosition();
  });

  /*
  load music 
   */
  function loadMusics(cate) {
    async.series({
        music: function(callback) {
          getInfoByHttp("http://xiebaochun.github.io/music-resource/music_list.json", callback);
        },
      },
      function(err, results) {
        console.log(results);
        var music_list = results.music.musics;
        list_musics(music_list);

        audioPlayer.setMusicList(music_list);
      });

  }

  /*
  list the music files
   */
  function list_musics(list) {

    $(".music-items").empty();

    //var html = '<div class="music-nav"><div id="music-name">歌曲</div><div id="music-author">歌手</div></div>'

    //var element = $(html);

    //$("#music-content").append(element);        

    $.each(list, function(index, item) {


      var html = '<div class="music-item"><div id="music-name">'+item.name+'</div><div id="music-author">'+item.author+'</div></div>'

      var element = $(html);

      element.click(function() {

        //console.log("click");
        $(".current-music-item").removeClass("current-music-item");

        $(this).addClass("current-music-item");

        $("#playing-song-info").html(item.name);

        audioPlayer.play(item.file_name);

      });

      $(".music-items").append(element);

    });
  }

  /*
  get information by http protocol
   */
  function getInfoByHttp(url, callback) {
    // http.get(url, function(res) {
    //   var body = '';
    //   res.on('data', function(d) {
    //     body += d;
    //     console.log(body);
    //     //callback(null, JSON.parse(body));
    //   });

    //   // res.on('end', function() {
    //   //   //var obj = JSON.parse(body);
    //   //   console.log();
    //   // });

    // }).on('error', function(e) {
    //   console.log(e);
    // });
    var request = require("request")
    request({
      url: url,
      json: true
    }, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        callback(null, body);
        //console.log(JSON.parse(body)) // Print the json response
      }
    })
  }


});