;
var async = require('async');
var nw = require('nw.gui');

var win = nw.Window.get();

function Lyric() {

	this.init();

}

var p = Lyric.prototype;

p._lrclist = [];


p.init = function(name) {
	$(".music-lyric").empty();
	$(".music-lyric").css("left", 188 + $('.music-content').width() + "px");
	$('.lrc-list').css("top", win.h / 2 + "px");
	//$(".music-lyric").css("width",188+$('.music-content').width()+"px");
	var lyrc = this;
	async.series({
		lrcContent: function(callback) {
			lyrc.getLrcContent("https://raw.githubusercontent.com/xiebaochun/music-resource/gh-pages/lrc/" + name + ".lrc", callback);
		}
	}, function(err, results) {
		console.log(results);

		p.listLrcContent(results.lrcContent);
	});
}

p.getLrcContent = function(address, callback) {
	$.get(address, function(data) {
		callback(null, data);
	});;
}
p.listLrcContent = function(content) {
	var lyric = this;
	lyric._lrclist = [];
	var list = $('<ul class="lrc-list"></ul>');
	var timeExp = /\[(\d{2,})\:(\d{1,})(?:\.(\d{2,3}))?\]/g,
		tagsRegMap = {
			title: 'ti',
			artist: 'ar',
			album: 'al',
			offset: 'offset',
			by: 'by'
		};

	//content = content.replace(/\r|\n/ig,'<br>').replace(timeExp,'');
	var lines = content.split(/\r|\n/ig);

	$.each(lines, function(index, item) {
		var _lyric = item.replace(timeExp, '')
		var o_li = {
			time: item.replace(_lyric, '').replace(/\[|\]/g, ''),
			lyric: _lyric
		}
		lyric._lrclist.push(o_li);

		var e_li = '<li class="lyric-item" id="' + o_li.time + '">' + o_li.lyric + '</li>'
		list.append($(e_li));
	});

	console.log(this._lrclist);
	$(".music-lyric").append(list);
	//this.setItemColorByTime('00:28');
	//$('.lrc-list').css('color','#179EBB');
}

p.setItemColorByTime = function(time) {
	$.each(this._lrclist, function(index, item) {
		if (item.time.indexOf(time) > -1) {
			$('.lrc-list').animate({
				top: '-=24'
			}, 1000, function() {});
			$('.lyric-cur').removeClass("lyric-cur");
			$('.lrc-list').children().eq(index).addClass("lyric-cur");
			//$(".lyric-cur").css("font-size", "2.2vw");
		}
	})

	//$('#'+time).css('color','#179EBB');

}