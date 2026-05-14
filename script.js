let timerDisplay = document.getElementById("timer");
let totalTime = document.getElementById("totalTime");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let subjectSelect = document.getElementById("subjectSelect");
let interval = null;
let seconds = 0;
let minutes = 0;
let hours = 0;
let currentSubject = subjectSelect.value;
let studyData = JSON.parse(localStorage.getItem("studyData")) || {
  HTML: 0,
  CSS: 0,
  JS: 0,
  REACT: 0,
  DSA: 0
};
subjectSelect.addEventListener("change",()=>{
  currentSubject = subjectSelect.value;
});

function formatTime(sec){
  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec % 3600) / 60);
  let s = sec % 60;

  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function updateUI(){
  let h = String(hours).padStart(2,"0");
  let m = String(minutes).padStart(2,"0");
  let s = String(seconds).padStart(2,"0");

  timerDisplay.textContent = `${h}:${m}:${s}`;
  totalTime.textContent = `${h}:${m}:${s}`;
  document.querySelectorAll("#today-study li").forEach((li)=>{
    let text = li.textContent.split("-")[0].trim();
    if(studyData[text] !== undefined){
      li.textContent = `${text} - ${formatTime(studyData[text])}`;
    }
  });
}

function saveData(){
  localStorage.setItem("studyData", JSON.stringify(studyData));
}

function updateTimer(){
  seconds++;

  if(seconds == 60){
    seconds = 0;
    minutes++;
  }

  if(minutes == 60){
    minutes = 0;
    hours++;
  }

  // convert current subject into seconds
  let totalSec =
    studyData[currentSubject] + 1;

  studyData[currentSubject] = totalSec;

  updateUI();
  saveData();
}

startBtn.addEventListener("click",()=>{
  if(interval === null){
    interval = setInterval(updateTimer,1000);
  }
});

pauseBtn.addEventListener("click",()=>{
  clearInterval(interval);
  interval = null;
  saveData();
});

resetBtn.addEventListener("click",()=>{
  clearInterval(interval);
  interval = null;

  seconds = 0;
  minutes = 0;
  hours = 0;

  studyData[currentSubject] = 0;

  updateUI();
  saveData();
});
updateUI();