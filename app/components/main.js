
var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
const _volume = React.createClass({
		   render:function(){
		     return(
		       <div>
		         <div className="toggle-mute toMute" id="toggle-mute-btn"></div>
		       </div>
		     );
		   }
		 });
ReactDOM.render(<_volume />, document.getElementById('music-colume-control'));
const style = {margin:0};

function log(value) {
  console.log(value);
}


function percentFormatter(v) {
  return v + ' %';
}
const CustomizedSlider = React.createClass({
	statics: {
	    update: function(value) {
	      //return 'bar';
	      this.setState({
	      	value:value
	      });
	      //this.onSliderChange(value);
	    }
	  },
  getInitialState: function() {
  	var _this = this;
  	audioPlayer.addEvent("timeupdate", function() {
	    // playback.updateTimeData();
	    // playback.updateCurPosition();
	    // if (cur_time != $('#cur').html()) {
	    //   cur_time = $('#cur').html()
	    //   lyric.setItemColorByTime($('#cur').html());
	    // }
	    var cur_width = parseInt(this.audioPlayer.getPercentOfCurentTime() * $("#downloadingProgressBar").width());
	    _this.setState({value:cur_width});
	 });
    return {
      value: 50,
    };
  },
  onSliderChange: function(value) {
    this.setState({
      value: value,
    });
  },
  render: function() {
    return <div style={style}>
		      <Rcslider tipTransitionName="rc-slider-tooltip-zoom-down" value={this.state.value} onChange={this.onSliderChange} />
		    </div>
  },
});

window.CustomizedSlider = CustomizedSlider;

ReactDOM.render(<CustomizedSlider />, document.getElementById('time-progress-bar'));
