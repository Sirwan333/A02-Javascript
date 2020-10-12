function welcomeandend(){
    let userName = document.getElementById("userInputName").value
    welcomeMessage.style.display = "none";
    document.getElementById("welcomeMessageName").innerHTML=`Welcome ${userName}<br>  Press the button to start the first quiestion`
    document.getElementById("winN").innerHTML = `Awesome! ${userName}, you win!<br>`
    document.getElementById("lostN").innerHTML = `Unfortunately ${userName}, you lost! Better luck next time <br>`
}

export default {
    welcomeandend
};

