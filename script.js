const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  songIndex < 0 && (songIndex = songs.length - 1);

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  songIndex > songs.length - 1 && (songIndex = 0);

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  // Can get duration and current time of song from srcElement
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar (clicking progress bar allows you to skip to that location in song)
function setProgress(e) {
  // setProgress function is given as a parameter for the progressContainer 'click' event listener, so `this` is progressContainer element. So, getting inner width of progressContainer element in px
  const width = this.clientWidth;
  // offset in the X coordinate of mouse pointer between that event and padding edge of target node
  const clickX = e.offsetX;
  const duration = audio.duration;

  // Set current time to clicked position
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  isPlaying ? pauseSong() : playSong();
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

document.addEventListener('keydown', (e) => {
  // keyCode is deprecated; see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

  switch (e.code) {
    case 'ArrowLeft':
      prevSong();
      break;
    case 'ArrowRight':
      nextSong();
      break;
    case 'Space':
      const isPlaying = musicContainer.classList.contains('play');
      isPlaying ? pauseSong() : playSong();
      break;
  }
});

// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
