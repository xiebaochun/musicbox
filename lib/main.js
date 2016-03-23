$(function() {
  

  var audioPlayer = new MyAudio("http://xiebaochun.github.io/music-resource/");
  //var audioPlayer = new MyAudio("music/");

  var lyric = new Lyric();

  var playback = new Playback(audioPlayer, lyric);

  //var lyric = new Lyric();

  var cur_time = '';

  //add time upate event handler
  audioPlayer.addEvent("timeupdate", function() {
    playback.updateTimeData();
    playback.updateCurPosition();
    if (cur_time != $('#cur').html()) {
      cur_time = $('#cur').html()
      lyric.setItemColorByTime($('#cur').html());
    }
  });

  setTimeout(function() {
    $("#loader").fadeOut();
  }, 0);

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
  // win.on("resize", function(w, h) {
  //   playback.updateCurPosition();
  //   $(".music-lyric").css("left", 188 + $('.music-content').width() + "px");
  //   $(".music-lyric").css("width", w - (188 + $('.music-content').width()) + "px");
  //   $(".lrc-list>li").css("font-size", "1.5vw");
  //   $(".lyric-cur").css("font-size", "2.2vw");
  // });
  adjustLayout();
  $(window).resize(function() {
    adjustLayout();
  });

  function adjustLayout(){
    var w = $(window).width();
    $(".music-lyric").css("left", 188 + $('.music-content').width() + "px");
    $(".music-lyric").css("width", w - (188 + $('.music-content').width()) + "px");
    playback.updateCurPosition();
  }
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
        //console.log(results);
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


      var html = '<div class="music-item"><div id="music-name">' + item.name + '</div><div id="music-author">' + item.author + '</div></div>'

      var element = $(html);

      element.click(function() {

        //console.log("click");
        $(".current-music-item").removeClass("current-music-item");

        $(this).addClass("current-music-item");

        $("#playing-song-info").html(item.name);

        audioPlayer.play(item.file_name);

        lyric.init(item.name);

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
    // var request = require("request")
    // request({
    //   url: url,
    //   json: true
    // }, function(error, response, body) {

    //   if (!error && response.statusCode === 200) {
    //     callback(null, body);
    //     //console.log(JSON.parse(body)) // Print the json response
    //   }
    // })

    $.ajax({
      url:url,
      method:'get',
      data:{},
      success:function(ret){
        console.log(ret);
        callback(null, ret);
      },
      dataType:'json'
    });
  }
});