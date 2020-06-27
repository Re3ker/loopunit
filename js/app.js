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
playBtn.addEventListener('click', togglePlay);

let videoThrough = 0;
let progressTimer = setInterval(handleProgress, 20);
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
  clearInterval(progressTimer);
  setTimeout(function(){progressTimer = setInterval(handleProgress, 20);}, 200);
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
  if (!videoPlayer || !videoPlayer.duration) {
    return;
  }
  var through = (videoPlayer.currentTime / videoPlayer.duration);
  if (through < videoThrough) {
    videoThrough = through;
  }
  videoThrough = 0.9 * videoThrough + 0.1 * through;
  progressBar.style.width = `${(videoThrough * 100).toFixed(3)}%`;
}