$(function() {
  ///////////////////////////////////////////////////////////window bar click
  //窗口栏
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
      if ($(window).width() == screen.width) {
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

    window.onkeydown=function(evt) {
      if (evt.which == 116) {
        window.location.reload(true)
      }
      if (evt.which == 123) {
        win.showDevTools();
      }
    }

  }
  ////////////////////////////////////////////////////////////your code
  setTimeout(function() {
    $("#loader").fadeOut();
  }, 100);
  ////////////////////////////////////////////////////////////nav left event
  $("#baidu-music-box").click(function(){
    // $('.main_view').load('http://www.baidu.com'); // SERIOUSLY!
     window.location.href="http://play.baidu.com/";
    $.ajax({
        url: 'http://www.baidu.com/',
        type: 'GET',
        success: function(res) {
            // var headline = $(res.responseText).find('a.tsh').text();
            // alert(headline);
            console.log(res);
        }
    });
     
    // Works with $.get too!
  });
    
  
   

});