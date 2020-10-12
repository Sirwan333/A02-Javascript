/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import HtmlEl from './modules/htmlelment.js';
import Quizz from './modules/quizz.js';
import WelcomeAndEnd from './modules/welcomeandend.js';

let nextUrl = null;
let timable = true;
let countDown = 10;
let totalTime = 0;
function timer(){
  countDown = 10;
  let downloadTimer = setInterval(function(){
    totalTime = totalTime+1;
    if(countDown <= 0){
      clearInterval(downloadTimer);
      if(timable){
        lostN.style.display = "block";
      }
      
    }else if(!timable){
      clearInterval(downloadTimer);
    }
    document.getElementById("progressTime").innerHTML = 10 - countDown;
    if(!timable){
      totalTime--;
    }
    countDown -= 1;
  
  }, 1000);
}

function updateContent(str) {
  HtmlEl.content.innerHTML = str
}

nameButton.addEventListener("click", () => {
  WelcomeAndEnd.welcomeandend();
})

let counter = 1;
startButton.addEventListener("click", () => {
  timer();
  let status = "Clicked D"
  updateContent(status)
  Quizz.getFirstQuestion()
  .then(response => {
      response.json().then((data) => {
          updateContent(JSON.stringify(data.question, null, 4))
          nextUrl = data.nextURL
      });
  })
  .catch((err) => {
      console.log('Fetch Error :-S', err)
  });
})

sumiteAnswerButton.addEventListener("click", () => {
    timable = false;
    let status = "Clicked E"
    counter++;
    let id = HtmlEl.userId.value
    if(radioOptions.style.display==="block"){
      for (var i=0; i<document.radioOptions.answer.length; i++)  {
        if (document.radioOptions.answer[i].checked)  {
          id = document.radioOptions.answer[i].value
        }
      }
    }
    let body = {
        answer: id
    }
    updateContent(status + id)
    Quizz.sendQuestionResponsePost(nextUrl, body)
    .then(response => {
        response.json().then((data) => {
            updateContent(JSON.stringify(data.message, null, 4))
            if(counter==6){
              nextUrl = "http://mikaelroos.se:3001/question/326"
            }
            else if(counter==7){
              winN.style.display = "block";
            }
            else{
              nextUrl = data.nextURL
            }
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
})

nextButton.addEventListener("click", () => {
  timable = true;
  timer();
  radioOptions.style.display="none"
  answerInput.style.display="inline"
    let status = "Clicked F"
    let id = HtmlEl.userId.value
    updateContent(status + id)
    Quizz.getQuestion(nextUrl)
    .then(response => {
        response.json().then((data) => {
          if(data.hasOwnProperty('alternatives')){
            radioOptions.style.display="block"
            answerInput.style.display="none"
            HtmlEl.alt1.innerHTML = JSON.stringify(data.alternatives.alt1, null, 4)
            HtmlEl.alt2.innerHTML = JSON.stringify(data.alternatives.alt2, null, 4)
            HtmlEl.alt3.innerHTML = JSON.stringify(data.alternatives.alt3, null, 4)
            HtmlEl.alt4.innerHTML = JSON.stringify(data.alternatives.alt4, null, 4)
          }
            updateContent(JSON.stringify(data.question, null, 4))
            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
        
    });
})
