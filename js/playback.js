;

function Playback(audioPlayer) {
	this.audioPlayer = audioPlayer;
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
	$("#total").html(audioPlayer.getDuration());
	$("#cur").html(audioPlayer.getCurrentTime());
}