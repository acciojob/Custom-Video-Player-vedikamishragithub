const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); //done
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


video.muted();
video.play();
video.addEventListener('timeupdate', () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  progressBar.style.flexBasis = `${percent}%`;
});

// Seek video on click
progress.addEventListener('click', (e) => {
  const rect = progress.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  let newTime = (clickX / width) * video.duration;
  newTime = Math.max(0, Math.min(newTime, video.duration));
  video.currentTime = newTime;  
});

// Toggle play/pause
toggle.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    toggle.innerText = '❚ ❚';
  } else {
    video.pause();
    toggle.innerText = '►';
  }
});

ranges.forEach(range=>{
	
	range.addEventListener('input',()=>{
		if(range.name==='volume'){
			video.volume=range.value;
		}else if(range.name==='playbackRate'){
			const newSpeed=parseFloat(range.value);
	        video.playbackRate = parseFloat(range.value);
		}	
});
});
skipButtons.forEach(skipButton=>{
	skipButton.addEventListener('click',()=>{
       const skipAmount=parseFloat(skipButton.dataset.skip);
	   video.currentTime+=skipAmount;	
	});
});

