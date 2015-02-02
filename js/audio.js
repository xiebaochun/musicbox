/*
this is the audio player 
 */
function MyAudio() {
		this.init();
	}
	/*
	p is the audio prototype
	 */
var p = MyAudio.prototype;

p.audioPlayer = null;

p.audioFiles = null;

p.audioFilesCount = 0;

p._volume = 1;

p.bgPic = "";

p.bgPicCount = 0;

p.isAudioFileInit = false;

p.isBgFileInit = false;

p._isPlay = false;

p._isLoop = false;

p._currentIndex = 0;

p._bgFiles = null;

p._bgFilesCount = 0;

p._currentBgIndex = 0;

p._bgOpacity = 0.5;

p.init = function() {
	this.audioPlayer = new Audio();
};
p.initAudioPlayer = function(filePath) {
	// console.log("into init audioPlayer with file:"+filePath);
	// this.audioPlayer = null;
	// this.audioPlayer = new Audio(filePath);
	// console.log("finish init audioPlayer");
};
//get the Audio file under the Music directory by ajax technology and powered by php
p.getAudioFileList = function() {
	var self = this;
	console.log("into get audio file list");
	if (config.isPhp == true) {
		$.get("php/audio.php", function(data) {
			//console.log(data);
			self.audioFiles = data.audioFiles;
			self.audioFilesCount = self.audioFiles.length;
			self._currentIndex = Math.floor((Math.random() * self.audioFilesCount));
			self.initAudioPlayer(decodeURIComponent(self.audioFiles[self._currentIndex]));
			//console.log(data);
			self.isAudioFileInit = true;
			//execute something about init works
			//self.initAudioPlayer(this.audioFiles[0]);
			//self.audioPlayer=new Audio('Music/' + self.audioFiles[0]);
			//init(); 
			//self.play();
			//console.log(self.getAudioFilesCount());

			console.log("get audio.php file success");
			//console.log(this);
		}, "json").fail(function() {
			console.log("get audio.php file fail");
			self.audioFiles = config.defaultAudioFile;
			self.audioFilesCount = self.audioFiles.length;
			self._currentIndex = Math.floor((Math.random() * self.audioFilesCount));
			self.initAudioPlayer(self.audioFiles[self._currentIndex]);

			self.isAudioFileInit = true;
			console.log("use the default file audio file list");

		});
	} else {
		self.audioFiles = config.defaultAudioFile;
		self.audioFilesCount = self.audioFiles.length;
		self._currentIndex = Math.floor((Math.random() * self.audioFilesCount));
		self.initAudioPlayer(self.audioFiles[self._currentIndex]);

		self.isAudioFileInit = true;
		console.log("use the default file audio file list");
	}



};
//get background picture list
p.getBackgroundFileList = function() {
	var self = this;
	console.log("into get Background file list");
	if (config.isPhp == true) {
		$.get("php/audio.php", function(data) {
			self._bgFiles = data.bgFiles;
			console.log(self._bgFiles);
			self._bgFilesCount = self._bgFiles.length;
			self._currentBgIndex = Math.floor((Math.random() * self._bgFilesCount));

			console.log("get audio.php file success");

		}, "json").fail(function() {
			console.log("get audio.php file fail");
			self._bgFiles = config.defaultBgFile;
			self._bgFilesCount = self._bgFiles.length;
			self._currentBgIndex = Math.floor((Math.random() * self._bgFilesCount));
			console.log("use the default file audio file list");
		});
	} else {
		self._bgFiles = config.defaultBgFile;
		self._bgFilesCount = self._bgFiles.length;
		self._currentBgIndex = Math.floor((Math.random() * self._bgFilesCount));
		console.log("use the default file audio file list");
	}
};
p.getAudioFilesCount = function() {
	return this.audioFilesCount;
};
p.changeSrc = function(filePath) {
	this.audioPlayer.src = filePath;
}
p.play = function(filePath) {
	if (filePath) {
		this.audioPlayer.pause();
		this.changeSrc(filePath);
	}
	this.audioPlayer.play();
	console.log("play");
	this._isPlay = true;
};
p.isPlaying = function() {
	return this._isPlay;
};
p.pause = function() {
	this.audioPlayer.pause();
}
p.isPaused = function() {
	return this.audioPlayer.paused;

}
p.isEnded = function() {
		return this.audioPlayer.ended;
	}
	//play next audio file by random
p.playNextByRandom = function() {
	var index = this._currentIndex;
	while (true) {
		index = Math.floor((Math.random() * this.audioFilesCount));
		if (index != this._currentIndex) break;
	}
	console.log("当前index:" + index);
	this._currentIndex = index;
	this.initAudioPlayer(this.audioFiles[this._currentIndex]);
	this.play();
}
p.isInit = function() {
	return this.isAudioFileInit;
};

p.isLoop = function() {
	return this._isLoop;
}

p.setLoop = function(isLoop) {
	console.log("set loop");
	if (typeof this.audioPlayer.loop == 'boolean') {
		this.audioPlayer.loop = isLoop;
		console.log("set loop by loop");
	} else {
		if (isLoop) {
			this.audioPlayer.addEventListener('ended', this.play);
		} else {
			this.audioPlayer.removeEventListener('ended', this.play);
		}
		console.log("set loop by event");

	}
	this._isLoop = isLoop;

}

p.getVolume = function() {
	return this._volume;
}

p.setVolume = function(volume) {
	this.audioPlayer.volume = this._volume = volume;
}
p.addVolume = function(Alta) {
	if (this._volume < 1) {
		this._volume += Alta;
		if (this._volume > 1) this._volume = 1;
		this.audioPlayer.volume = this._volume;
	}

}
p.reduceVolume = function(Alta) {
	if (this._volume > 0) {
		this._volume -= Alta;
		if (this._volume < 0) this._volume = 0;
		this.audioPlayer.volume = this._volume;
		//console.log(this.audioPlayer.volume);  
	}

}
p.addBgOpacity = function(Alta) {
	if (this._bgOpacity < 0.9) {
		this._bgOpacity += Alta;
		if (this._bgOpacity > 0.9) this._bgOpacity = 0.9;
	}

}

p.reduceBgOpacity = function(Alta) {
	if (this._bgOpacity > 0) {
		this._bgOpacity -= Alta;
		if (this._bgOpacity < 0) this._bgOpacity = 0;
	}

}

p.getBgOpacity = function() {
	return this._bgOpacity;
}

p.setBgOpacity = function(opacity) {
	this._bgOpacity = opacity;
}

p.getBgName = function() {
	return this._bgFiles[this._currentBgIndex];
}
p.getBgNameByRandom = function() {
	var index = this._currentBgIndex;
	while (true) {
		index = Math.floor((Math.random() * this._bgFilesCount));
		if (index != this._currentBgIndex) break;
	}
	//console.log("当前BG index:"+index);
	this._currentBgIndex = index;
	return this._bgFiles[this._currentBgIndex];
}
p.getBuffered = function() {
	console.log(this.audioPlayer.buffered);
	return this.audioPlayer.buffered;
}

p.getDuration = function() {
	//console.log(this.audioPlayer.duration);
	var duration = parseInt(this.audioPlayer.duration);

	return this.getTimeFromSeconds(duration);
}

p.getPlayed = function() {
	console.log(this.audioPlayer.played);
	return this.audioPlayer.played;
}

p.getCurrentTime = function() {
	//console.log(this.audioPlayer.currentTime);
	var currentTime = parseInt(this.audioPlayer.currentTime);
	return this.getTimeFromSeconds(currentTime);
}

p.getPercentOfCurentTime = function(){
	return this.audioPlayer.currentTime/this.audioPlayer.duration;
}

p.addEvent = function(event, callback) {
	this.audioPlayer.addEventListener(event, callback);
}

p.getTimeFromSeconds = function(totalSeconds) {
	if (totalSeconds < 86400) {
		var dt = new Date("01/01/2000 0:00");
		dt.setSeconds(totalSeconds);
		return this.formatTime(dt);
	} else {
		return null;
	}
}

p.formatTime = function(dt) {
	var h = dt.getHours(),
		m = dt.getMinutes(),
		s = dt.getSeconds(),
		r = "";
	if (h > 0) {
		r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
	}
	r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
	r += (s > 9 ? s.toString() : "0" + s.toString());
	return r;
}