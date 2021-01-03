const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [
  'Christina Aguilera - Genie In a Bottle',
  'Eminem - My Name Is',
  "Destiny's Child - Bills, Bills, Bills",
  'TLC - No Scrubs',
  "Ricky Martin - Livin' la Vida Loca",
  'Santana feat. Rob Thomas - Smooth',
  'Len - Steal My Sunshine',
  'Eiffel 65 - Blue (Da Ba Dee)',
  '702 - Where My Girls At',
  'Macy Gray - I Try',
  'Mariah Carey - Heartbreaker',
  'Backstreet Boys - I Want It That Way',
  'Britney Spears - (You Drive Me) Crazy',
  "Destiny's Child - Say My Name",
  "Blink 182 - What's My Age Again",
  'Will Smith - Wild Wild West',
  'Sugar Ray - Every Morning',
];

// Keep track of song
let songIndex = 0;

// Random mode off by default
let randomMode = false;

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
  // If random mode is true, get random index; otherwise, just increment to get next song in songs array
  if (randomMode) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex++;
  }

  songIndex > songs.length - 1 && (songIndex = 0);

  loadSong(songs[songIndex]);

  playSong();
}

// Random song mode
function shuffle() {
  randomMode = !randomMode;
  // If random mode just turned on, set song index to random number; otherwise, random mode was just turned off - songIndex will just be incremented in nextSong() if randomMode is false
  randomMode && (songIndex = Math.floor(Math.random() * songs.length));

  randomMode
    ? shuffleBtn.classList.add('random-mode')
    : shuffleBtn.classList.remove('random-mode');

  // If random mode is true (i.e., random mode just set to true at top of this function) and button is clicked, it's just being turned off; don't want to go to next song - when next song starts, it will be next in original order, not random
  if (randomMode) {
    loadSong(songs[songIndex]);

    playSong();
  }
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

  // When play button is clicked, it gets focused; when hitting spacebar after, browser can sometimes interpret it as an event from button. blur() fixes this bug
  // HTMLElement.blur() method removes keyboard focus from current element
  playBtn.blur();

  isPlaying ? pauseSong() : playSong();
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Random song (random song mode on)
shuffleBtn.addEventListener('click', shuffle);

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

  // Consume the event so it doesn't get handled twice
  // e.preventDefault();
});

// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
