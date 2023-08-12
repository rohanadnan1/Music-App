let masterPlay = document.getElementById("play");
let progressBar = document.getElementById("progressBar");
let songDisplay = document.getElementById("song-display")
let songItemPlay = document.querySelectorAll(".songItemPlay");

let songIndex = 0;
let audioElement = new Audio();

let songItems = Array.from(document.querySelectorAll(".song-info"))
let songs = [
    {songName : "Tere Hawale", filePath : "./songs/tere-hawale.mp3", coverImg : "./covers/tere-hawale.jpg"},
    {songName : "Raatan Lambiyan", filePath : "./songs/raatan-lambiyan.mp3", coverImg : "./covers/raatan-lambiyan.jpeg"},
    {songName : "Glimpse of Us", filePath : "./songs/glimpse-of-us.mp3", coverImg : "./covers/glimpse-of-us.jpeg"},
    {songName : "Die for you - Weeknd", filePath : "./songs/weeknd-die.mp3", coverImg : "./covers/weeknd-die.jpeg"},
    {songName : "Die for you - Joji", filePath : "./songs/joji-die.mp3", coverImg : "./covers/joji-die.jpeg"},
    {songName : "Sau tarah ke", filePath : "./songs/sau-tarah-ke.mp3", coverImg : "./covers/sau-tarah-ke.jpeg"},
    {songName : "No love", filePath : "./songs/no-love.mp3", coverImg : "./covers/no-love.jpg"},
    {songName : "Past Lives", filePath : "./songs/past-lives.mp3", coverImg : "./covers/past-lives.jpeg"},
    {songName : "Khairiyat", filePath : "./songs/khairiyat.mp3", coverImg : "./covers/khairiyat.jpg"},
    {songName : "Desi Girl", filePath : "./songs/desi-girl.mp3", coverImg : "./covers/desi-girl.jpeg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByClassName("cover")[0].src = songs[i].coverImg;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.src = "./pause-solid.svg"
        songItemPlay.src = "./pause-solid.svg"
    }
    else{
        audioElement.pause()
        masterPlay.src = "./play-solid.svg"
        songItemPlay.src = "./play-solid.svg"
    }

    // updateSongItemPlayImages(!audioElement.paused);
})

// function updateSongItemPlayImages(isPlaying) {
//     // Get all song item play buttons
//     const songItemPlays = document.querySelectorAll(".songItemPlay");

//     // Update play/pause images based on the isPlaying state
//     songItemPlays.forEach((element) => {
//         const index = parseInt(element.id);
//         element.src = isPlaying ? "./pause-solid.svg" : "./play-solid.svg";
//     });
// }

audioElement.addEventListener("timeupdate", ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    progressBar.value = progress;
})

progressBar.addEventListener("change", () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

let makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>{
        element.src= "./play-solid.svg"
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        if(audioElement.paused){
         element.src="./pause-solid.svg"
        masterPlay.src = "./pause-solid.svg"
        audioElement.src = songs[songIndex].filePath
        songDisplay.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        }
        else {
            element.src = "./play-solid.svg";
            masterPlay.src = "./play-solid.svg"
            audioElement.pause();
        }
    })
})

document.getElementById("forward").addEventListener("click", ()=>{
    if (songIndex >= 9) {
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    masterPlay.src = "./pause-solid.svg"
    audioElement.src = songs[songIndex].filePath
    songDisplay.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
})

document.getElementById("backward").addEventListener("click", ()=>{
    if (songIndex <= 0) {
        songIndex = 9;
    }else{
        songIndex -= 1;
    }
    masterPlay.src = "./pause-solid.svg"
    audioElement.src = songs[songIndex].filePath
    songDisplay.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
})