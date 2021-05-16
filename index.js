


const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

const songs = [
{
    name: 'Closer',
    title: 'Closer',
    artist: 'Chainsmoker',
},
{
    name: 'kaise_Hua',
    title: 'Kaise Hua',
    artist: 'Kabir Singh',
},
{
    name: 'pehla_Pyaar',
    title: 'Pehla Pyaar',
    artist: 'Kabir Singh',
},
{
    name: 'Mohra',
    title: 'Tu cheez',
    artist: 'Mohra',
},
{
    name: 'billo-rani',
    title: 'Billo Rani',
    artist: 'Goal',
},
{
    name: 'Rockstar',
    title: 'Kun Faya Kun',
    artist: 'Rockstar',
},
{
    name: 'Vivah',
    title: 'Tere Dware Pe',
    artist: 'Vivah',
},
{
    name: 'ishq_risk',
    title: 'Ishq Risk',
    artist: 'Mere Brother ki Dulhan',
},
];

let isPlaying = false;

// For playing the music 
const playMusic = () =>{
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};

// For pause the music
const pauseMusic = () =>{
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", () =>{
    isPlaying ? pauseMusic() : playMusic();
});

// Changing the music data

const loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "Images/" + songs.name + ".jpg";
};

songIndex = 0;
// loadSong(songs[4]);

const nextSong = () =>{
    songIndex = (songIndex + 1)% songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () =>{
    songIndex = (songIndex -1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// Progress js work
music.addEventListener("timeupdate", (event) =>{
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime/duration) * 100;
    progress.style.width = `${progress_time}%`;

    // total duration
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if(sec_duration<10){
        sec_duration = `0${sec_duration}`
    }
    if(duration){
       total_duration.textContent = `${min_duration}:${sec_duration}`;
    }
    // Current duration
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if(sec_currentTime<10){
        sec_currentTime = `0${sec_currentTime}`
    }
    current_time.textContent = `${min_currentTime}:${sec_currentTime}`;
});

// get current time on click
progress_div.addEventListener('click',(event) =>{
    const{duration} = music;

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
});

// If music is end call next song function
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);