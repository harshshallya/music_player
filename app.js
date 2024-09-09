const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");

const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

const songs = [
  {
    title: "Phir Se Ud Chala",
    name: "Mohit Chauhan",
    source: "https://github.com/harshshallya/songs/raw/main/psuc.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Rockstar_%28soundtrack%29.jpg/220px-Rockstar_%28soundtrack%29.jpg",
  },
  {
    title: "Kya Hua Tera Wada",
    name: "Kishore Kumar",
    source: "https://github.com/harshshallya/songs/raw/main/128-Kya%20Hua%20Tera%20Vada%20-%20Hum%20Kisise%20Kum%20Naheen%20128%20Kbps.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Kya_Hua_Tera_Vaada.jpg/220px-Kya_Hua_Tera_Vaada.jpg",
  },
  {
    title: "Aankhon Se Batana",
    name: "Dikshant",
    source: "https://github.com/harshshallya/songs/raw/main/Aankhon%20Se%20Batana_320(PagalWorld.com.sb).mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Gangastas Paradise",
    name: "Coolio x L.V",
    source: "https://github.com/harshshallya/songs/raw/main/Gangstas-Paradise(Pagal-World.Com.In).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Coolio_-_Gangsta%27s_Paradise.jpg/220px-Coolio_-_Gangsta%27s_Paradise.jpg",
  },
  {
    title: "Ranvijay Entry Medley",
    name: "A.R.Rahaman",
    source: "https://github.com/harshshallya/songs/raw/main/Ranvijay%20Entry%20Medley_320(PagalWorld.com.so).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Animal_Soundtrack_Album_Cover.jpg/220px-Animal_Soundtrack_Album_Cover.jpg",
  },
  {
    title: "Way Down We Go",
    name: "Kaleo",
    source: "https://github.com/harshshallya/songs/raw/main/Way-Down-We-Go(PagalNew.Com.Se).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a1/KaleoWayDownWeGo.jpg",
  },
];

let currentSongIndex = 0;

function startRotation() {
  if (!rotating) {
    rotating = true;
    rotationInterval = setInterval(rotateImage, 50);
  }
}

function pauseRotation() {
  clearInterval(rotationInterval);
  rotating = false;
}

function rotateImage() {
  currentRotation += 1;
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  rotatingImage.src = songs[currentSongIndex].cover;

  song.addEventListener("loadeddata", function () {});
}

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    pauseRotation();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  startRotation();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 100,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    click(swiper) {
      currentSongIndex = swiper.clickedIndex;
      updateSongInfo();
      playPause();
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
document.addEventListener('DOMContentLoaded', function() {
  const songElements = document.querySelectorAll('.recommended-songs .song');
  const audioElement = document.getElementById('song');
  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const albumCover = document.getElementById('rotatingImage');

  songElements.forEach(song => {
      song.addEventListener('click', function() {
          const songUrl = this.getAttribute('data-song-url');
          const songTitle = this.querySelector('.song-title h2').textContent;
          const songArtist = this.querySelector('.song-title p').textContent;
          const songImg = this.querySelector('.song-img img').src;

          // Update the audio source and player details
          audioElement.src = songUrl;
          playerTitle.textContent = songTitle;
          playerArtist.textContent = songArtist;
          albumCover.src = songImg;

          // Play the new song
          

          // Update the rotation image
          albumCover.classList.add('rotating');
      });
  });

  // Play/pause button event listener
  document.querySelector('.play-pause-btn').addEventListener('click', () => {
      if (audioElement.paused) {
          audioElement.play();
          controlIcon.classList.remove('fa-play');
          controlIcon.classList.add('fa-pause');
          albumCover.classList.add('rotating');
      } else {
          audioElement.pause();
          controlIcon.classList.remove('fa-pause');
          controlIcon.classList.add('fa-play');
          albumCover.classList.remove('rotating');
      }
  });

  // Update the rotation when the song is manually paused/played
  audioElement.addEventListener('play', () => {
      albumCover.classList.add('rotating');
  });

  audioElement.addEventListener('pause', () => {
      albumCover.classList.remove('rotating');
  });

  const currentTimeElement = document.getElementById("current-time");
  const durationElement = document.getElementById("duration");

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateSongInfo() {
      songName.textContent = songs[currentSongIndex].title;
      artistName.textContent = songs[currentSongIndex].name;
      song.src = songs[currentSongIndex].source;
      rotatingImage.src = songs[currentSongIndex].cover;

      song.addEventListener("loadeddata", function () {
          durationElement.textContent = formatTime(song.duration);
      });
  }

  song.addEventListener("loadedmetadata", function () {
      progress.max = song.duration;
      progress.value = song.currentTime;
      durationElement.textContent = formatTime(song.duration);
  });

  song.addEventListener("ended", function () {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongInfo();
      playPause();
  });

  song.addEventListener("timeupdate", function () {
      if (!song.paused) {
          progress.value = song.currentTime;
          currentTimeElement.textContent = formatTime(song.currentTime);
      }
  });

  function playPause() {
      if (song.paused) {
          song.play();
          controlIcon.classList.add("fa-pause");
          controlIcon.classList.remove("fa-play");
          startRotation();
      } else {
          song.pause();
          controlIcon.classList.remove("fa-pause");
          controlIcon.classList.add("fa-play");
          pauseRotation();
      }
  }

  playPauseButton.addEventListener("click", playPause);

  progress.addEventListener("input", function () {
      song.currentTime = progress.value;
  });

  progress.addEventListener("change", function () {
      song.play();
      controlIcon.classList.add("fa-pause");
      controlIcon.classList.remove("fa-play");
      startRotation();
  });

  forwardButton.addEventListener("click", function () {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongInfo();
      playPause();
  });

  backwardButton.addEventListener("click", function () {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      updateSongInfo();
      playPause();
  });

  updateSongInfo();

  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      effect: 'coverflow',
      coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
  });

  // Function to update the recommended songs
  function updateRecommendedSongs(songs) {
      const songContainer = document.getElementById('song-container');
      songContainer.innerHTML = ''; // Clear the current song list
      songs.forEach((song) => {
          const songDiv = document.createElement('div');
          songDiv.classList.add('song');
          songDiv.innerHTML = `
              <div class="song-img">
                  <img src="${song.img}" alt="${song.title}" />
                  <div class="overlay">
                      <i class="fa-solid fa-play"></i>
                  </div>
              </div>
              <div class="song-title">
                  <h2>${song.title}</h2>
                  <p>${song.artist}</p>
              </div>
              <span>${song.duration}</span>
          `;
          songDiv.dataset.songUrl = song.url; // Set the song URL for playback
          songDiv.dataset.songTitle = song.title;
          songDiv.dataset.songArtist = song.artist;
          songDiv.dataset.songImg = song.img;
          songContainer.appendChild(songDiv);
      });

      // Re-add event listeners to the new song elements
      document.querySelectorAll('.recommended-songs .song').forEach(song => {
          song.addEventListener('click', function() {
              const songUrl = this.getAttribute('data-song-url');
              const songTitle = this.getAttribute('data-song-title');
              const songArtist = this.getAttribute('data-song-artist');
              const songImg = this.getAttribute('data-song-img');

              // Update the audio source and player details
              audioElement.src = songUrl;
              playerTitle.textContent = songTitle;
              playerArtist.textContent = songArtist;
              albumCover.src = songImg;

              // Play the new song
              audioElement.play().catch(error => {
                  console.error('Error playing the audio:', error);
              });

              // Update the rotation image
              albumCover.classList.add('rotating');
          });
      });
  }

  // Add event listeners to all Swiper slides
  const slides = document.querySelectorAll('.swiper-slide');

  slides.forEach(slide => {
      slide.addEventListener('click', () => {
          const songs = JSON.parse(slide.getAttribute('data-songs')); // Get the songs from the data-songs attribute
          updateRecommendedSongs(songs);
      });
  });
});
// Function to extract songs from the clicked playlist slide
function getPlaylistSongs(swiperSlide) {
  // Extract the 'data-songs' attribute from the clicked Swiper slide
  const songsData = swiperSlide.getAttribute('data-songs');
  if (songsData) {
    return JSON.parse(songsData); // Parse the JSON string into a JS array
  }
  return [];
}

// Function to display recommended songs in the specified container
function displayRecommendedSongs(songs) {
  const recommendedContainer = document.getElementById("recommended-songs");
  recommendedContainer.innerHTML = ""; // Clear previous recommendations

  songs.forEach(song => {
    // Create a new song element for each song
    const songElement = document.createElement("div");
    songElement.classList.add("recommended-song");

    // Build the song HTML (e.g., image, title, artist, etc.)
    songElement.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <div class="song-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <p>${song.duration}</p>
      </div>
      <button class="play-button">Play <i class="fa-solid fa-circle-play"></i></button>
    `;

    // Add event listener to play song when button is clicked
    songElement.querySelector('.play-button').addEventListener('click', () => {
      playSong(song);
    });

    // Append the song element to the recommended container
    recommendedContainer.appendChild(songElement);
  });
}

// Function to play a song (example logic for playing the song)
function playSong(song) {
  console.log("Playing:", song.title);
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = song.url; // Set the audio source to the song URL
  audioPlayer.play(); // Play the song
}

// Attach event listeners to all 'Listen Now' buttons
document.querySelectorAll('.swiper-slide .slide-overlay button').forEach(button => {
  button.addEventListener('click', function() {
    // Find the parent Swiper slide of the clicked button
    const swiperSlide = this.closest('.swiper-slide');
    
    // Get the songs for this specific playlist (Swiper slide)
    const songs = getPlaylistSongs(swiperSlide);

    // Display the recommended songs
    displayRecommendedSongs(songs);
  });
});
const swiperSlides = document.querySelectorAll('.swiper-slide');
const recommendedSongsContainer = document.getElementById('recommended-songs');
const audioPlayer = document.getElementById('audio-player');

swiperSlides.forEach(slide => {
  slide.addEventListener('click', () => {
    const songs = JSON.parse(slide.getAttribute('data-songs'));
    recommendedSongsContainer.innerHTML = ''; // Clear existing songs
    
    songs.forEach((song, index) => {
      const songElement = document.createElement('div');
      songElement.classList.add('song');
      songElement.setAttribute('data-song-index', index);
      songElement.setAttribute('data-song-url', song.url);
      songElement.innerHTML = `
        <div class="song-img">
          <img src="${song.img}" alt="${song.title}">
          <div class="overlay">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <div class="song-title">
          <h2>${song.title}</h2>
          <p>${song.artist}</p>
        </div>
        <span>${song.duration}</span>
      `;
      
      // Play the song when clicked
      songElement.addEventListener('click', () => {
        audioPlayer.src = song.url;
        audioPlayer.play();
      });

      recommendedSongsContainer.appendChild(songElement);
    });
  });
});


  