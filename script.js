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
  musicContainer.classList.add('pause');
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

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  isPlaying ? pauseSong() : playSong();
});

// Change song
prevBtn.addEventListener('click', prevSong);
// nextBtn.addEventListener('click', nextSong);

// document.addEventListener('keydown', (e) => {
//   // keyCode is deprecated; see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

//   switch (e.code) {
//     case 'ArrowLeft':
//       prevSong();
//       break;
//     case 'ArrowRight':
//       // nextSong();
//       break;
//     case 'Space':
//       const isPlaying = musicContainer.classList.contains('play');
//       isPlaying ? pauseSong() : playSong();
//       break;
//   }
// });
