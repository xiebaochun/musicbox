;

function Playback(audioPlayer) {

	this.audioPlayer = audioPlayer;

	var playback = this;
	audioPlayer.addEvent("pause", function() {
		audioPlayer._isPlay = false;
		playback.updatePlayButton(false);
	});
	audioPlayer.addEvent("play", function() {
		audioPlayer._isPlay = true;
		playback.updatePlayButton(true);
	});
	audioPlayer.addEvent("playing", function() {
		audioPlayer._isPlay = true;
		playback.updatePlayButton(true);
	});

	//Add play button click event handler
	$("#play").click(function(){
		if(audioPlayer.isPlaying()){
			audioPlayer.pause();	
		}else{
			audioPlayer.play();
		}
		//console.log("play click"+audioPlayer.isPlaying());
	});

	//Add play pre music button event listner handler
	$("#music-pre").click(function(){
		$(".current-music-item").prev().trigger("click");
		$( this ).animate({
		    opacity: 0.25,
		    top: "+=50px"   
		  }, 1000, function() {
		    // Animation complete.
		  });
	});

	//Add play next music button click event listener handler
	$("#music-next").click(function(){
		$(".current-music-item").next().trigger("click");
	});
}

var p = Playback.prototype;

p.audioPlayer = null;

/*
update the current time cursor and progress bar position
 */
p.updateCurPosition = function() {
	var cur_width = parseInt(this.audioPlayer.getPercentOfCurentTime() * $("#downloadingProgressBar").width());
	$("#cur-bar").css("width", cur_width + "px");
	$("#slider-handle").css("left", cur_width + "px");
	//console.log("call the playback updateCurPosition function");
}

/*
music time data update
 */
p.updateTimeData = function() {
	$("#total").html(this.audioPlayer.getDuration());
	$("#cur").html(this.audioPlayer.getCurrentTime());
}

/*
update the play button 
 */
p.updatePlayButton = function(isPlaying) {
	if (isPlaying) {
		$("#play").css("background-position", "-30px -100px");
	} else {
		$("#play").css("background-position", "-30px -150px");
	}
	console.log("udpate the play button !!!");
}