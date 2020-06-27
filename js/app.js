const navUploadBtn = document.querySelector('#navUploadBtn');
const mainUploadBtn = document.querySelector('#mainUploadBtn');
const fileUpload = document.querySelector('#fileUpload');
const mainSection = document.querySelector('#mainSection');
const videoSection = document.querySelector('#videoSection');
const videoPlayer = document.querySelector('#videoPlayer');
const playBtn = document.querySelector('#playBtn');
const progressBar = document.querySelector('#progressBar');
const mainUploadBtnText = document.querySelector('#mainUploadBtnText');
navUploadBtn.addEventListener('click', triggerUpload);
videoPlayer.addEventListener('click', togglePlay);
videoPlayer.addEventListener('play', updatePlaystate);
videoPlayer.addEventListener('pause', updatePlaystate);
videoPlayer.addEventListener('timeupdate', handleProgress);
playBtn.addEventListener('click', togglePlay);

let firstUpload = true;

fileUpload.onchange = function(event) {
  if(firstUpload){
    mainSection.style.display = 'none';
    videoSection.classList.add("pt");
    mainUploadBtnText.textContent = "Upload Another";
  }
  let file = event.target.files[0];
  let blobURL = URL.createObjectURL(file);
  videoPlayer.src = blobURL;
}
function triggerUpload(){
  mainUploadBtn.click();
}

function togglePlay(){
  const method = videoPlayer.paused ? 'play' : 'pause';
  videoPlayer[method]();
}

function updatePlaystate(){
  const playBtnIcon = this.paused ? '►' : '❚❚';
  playBtn.textContent = playBtnIcon;
}

function handleProgress() {
  const percent = Math.floor((videoPlayer.currentTime / videoPlayer.duration) * 100);
  progressBar.style.width = `${testing}%`;
}