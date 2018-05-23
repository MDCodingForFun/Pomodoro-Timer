$(document).ready(function(){

// CountDown Function---------------------------------------------------
  let   sessionCount = parseInt($('#timeDisplay').html()),
        breakCount = parseInt($('#break-counter').html()),
        statusDisplay = $('#status'),
        timerDisplay = $('#timeDisplay'),
        statusMessage = $('.statusMessage'),
        buzzer = $('#buzzer')[0],
        music = $('#music'),
        sessionCountDown,
        breakCountDown,
        isCounting = false;
  
        // let sessionCount = $('#timeDisplay').html(), 
        // sessionCount = sessionCount.replace(/:/g, ' ').split(' ');
        // a = parseInt(sessionCount[0]*60);
        // b = parseInt(sessionCount[1]);
        // sessionCount = a+b;
        // console.log(sessionCount);
  
  $('#playPauseBtn').on('click',function(e){
    event.preventDefault();
    $('#playPauseBtn>i').toggleClass('fa-play fa-stop');
     
    if(isCounting){
      clearInterval(sessionCountDown);
      clearInterval(breakCountDown);
      isCounting = false;
      console.log(sessionCount);
      
    }else{
      sessionTimer();
      isCounting = true;
      console.log(sessionCount);
    }
    
  });
  
  // Session Time Counter
  function sessionTimer(){
    
    let now = Date.now();
    let seconds = sessionCount*60;
    let then = now + seconds * 1000;

     displaySessionTimeLeft(seconds);
     endTime(then);
  
    //  console.log({seconds, then});
         
      sessionCountDown = setInterval(() => {
      const sessionTimeLeft = Math.round((then - Date.now())/1000);
      // console.log(sessionTimeLeft);
  
      if(sessionTimeLeft <= 0){
        clearInterval(sessionCountDown);
        buzzer.play();
        breakTimer();
        statusDisplay.html("Break Time");
      }
  
      displaySessionTimeLeft(sessionTimeLeft);
  
    },1000);
     
  }
  // Break Time Counter
  function breakTimer(){
    let now = Date.now();
    let seconds = breakCount*60;
    let then = now + seconds * 1000;
    displaySessionTimeLeft(seconds);
    // console.log({seconds, then});
  
       breakCountDown = setInterval (() => {
       const breakTimeLeft = Math.round((then - Date.now())/1000);
      //  console.log({breakTimeLeft});
  
       if(breakTimeLeft <= 0){
         buzzer.play();
         clearInterval(breakCountDown);
         reset();
       }
       displaySessionTimeLeft(breakTimeLeft);
  
    }, 1000);
  }
  
  // Display time left on screen
  function displaySessionTimeLeft(seconds){
    let minutes = Math.floor(seconds/60);
    let remainderSeconds = seconds % 60;
    
    // Add 0 if seconds is less than 10
    if(remainderSeconds <10){
      remainderSeconds = "0" + remainderSeconds;
    }else{
      remainderSeconds;
    }
    // Add 0 if minutes is less than 10
   if(minutes <10){
      minutes = "0" + minutes;
    }else{
      minutes;
    }
  
    let display = minutes + ":"+ remainderSeconds;
    timerDisplay.html(display);
  }
  
  // Display End Time on screen
  function endTime(timestamp){
    const end = new Date(timestamp);
    let hour = end.getHours();
    let minutes = end.getMinutes();
      
    if (hour > 12){
      hour -= 12;
    }else{
      hour;
    }
  
    if(hour < 10){
      hour = "0" + hour;
    }else{
      hour;
    }
  
    if(minutes < 10){
      minutes = "0" + minutes;
    }else{
      minutes;
    }
    // console.log({hour, minutes});
    statusMessage.html("Break time will start at "+ hour +":"+ minutes +".");
  }
  
      // decrement SESSION counter by 1 when clicking minus button
      $('#sessionMinus').on('click',function(e){
        event.preventDefault();
        if(sessionCount>0){
          sessionCount --;
          $('#session-counter').html(sessionCount);
          
          if(sessionCount < 10){
            newSessionCount = "0" + sessionCount + ":" + "00";
          }else{
            newSessionCount = sessionCount + ":" + "00"
          }
          timerDisplay.html(newSessionCount);
        }
      });
  
      // increment SESSION counter by 1 when clicking plus button
      $('#sessionAdd').on('click', function(e){
        event.preventDefault();
        sessionCount++;
        $('#session-counter').html(sessionCount);
        
        if(sessionCount < 10){
          newSessionCount = "0" + sessionCount + ":" + "00";
        }else{
          newSessionCount = sessionCount + ":" + "00"
        }
        timerDisplay.html(newSessionCount);
        
      });
  
      // decrement BREAK counter by 1 when clicking minus button
      $('#breakMinus').on('click', function(e){
        event.preventDefault();
        if(breakCount>0){
          breakCount--;
          $('#break-counter').html(breakCount);
        }
      });
      // increment by BREAK counter by 1 when clickin plus button
      $('#breakAdd').on('click', function(e){
        event.preventDefault();
        breakCount++;
        $('#break-counter').html(breakCount);
      });
  
      // Reset Button
      $('.resetBtn').on('click', reset);
      
      function reset(){
        // event.preventDefault();
        clearInterval(breakCountDown);
        clearInterval(sessionCountDown);
        statusDisplay.html("Session Time");
        statusMessage.html('"Do something wonderful today."');
        timerDisplay.html("25:00");
        $('#session-counter').html("25");
        $('#break-counter').html("5");
        $('#playPauseBtn>i').attr('class','fa fa-play');
      }


  // About Pomodoro Modal  Function---------------------------------------------
  let modal = document.getElementById('simpleModal'),
      modalBtn = document.getElementById('modalBtn'),
      closeBtn = document.getElementsByClassName('closeBtn')[0];
  
  modalBtn.addEventListener('click', openModal); //listen for open click
  closeBtn.addEventListener('click', closeModal);//listen for close click
  window.addEventListener('click', clickOutside);// Listen for outside click;
  function openModal(){
    modal.style.display = 'block';
  }
  function closeModal(){
    modal.style.display = 'none';
  }
  function clickOutside(e){
    if(e.target == modal){
      modal.style.display = 'none';
    }
  }

// To Do List Modal---------------------------------------------------
  let toDoModal = document.getElementById('toDoModal'),
      ToDoBtn = document.getElementById('ToDoBtn'),
      toDoCloseBtn = document.getElementsByClassName('toDoCloseBtn')[0];

      ToDoBtn.addEventListener('click', openToDoModal);
      toDoCloseBtn.addEventListener('click', closeToDoModal);
      // window.addEventListener('click', clickOutsideToDo);

    function openToDoModal(){
      toDoModal.style.display = 'block';
    }
    function closeToDoModal(){
      toDoModal.style.display = 'none';
    }
    function clickOutsideToDo(){
      toDoModal.style.display = 'none';
    }


  let myNodeList = document.getElementsByTagName('li'),
    myUL = document.getElementById('myUl'),
    addBtn = document.getElementById('addToDoBtn');

// create item list
function newItem(){
  let li = document.createElement('li'),
      input = document.getElementById('input'),
      inputValue = document.getElementById('input').value,
      str = inputValue.trim(),
      task = document.createTextNode(str);

      li.appendChild(task);

   if(inputValue ===''){
     alert("Please Enter Task.");
   }else{
     myUL.appendChild(li);
     input.value = '';
     input.focus();
   }
   input.value = '';

      // Create 'close' button and append to each list item
for( i = 0; i < myNodeList.length; i++){
  let span = document.createElement('span'),
      text = document.createTextNode('\u00D7');
      span.className = 'close';
      span.appendChild(text);
      myNodeList[i].appendChild(span);
};


// set item display style to 'none' when clicking x button
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}
      
}

// Event Listners
addBtn.addEventListener('click', newItem);
input.addEventListener('keyup', function(event){
  let code = event.keyCode;

  if(code === 13){
    newItem();
  }
})
input.focus();
// add checked mark when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


  
  
  });