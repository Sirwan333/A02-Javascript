let countDown = 10;
let totalTime = 0;
let timable = true;
  
function timer(){
    countDown = 10;
    let downloadTimer = setInterval(function(){
        totalTime = totalTime+1;
        if(countDown <= 0){
            clearInterval(downloadTimer);
            if(timable){
                lostN.style.display = "block";
               document.getElementById("totalTimer1").innerHTML = totalTime
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


export default {
    timer,
    timable
}