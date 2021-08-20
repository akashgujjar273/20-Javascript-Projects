const inputContainer=document.getElementById("input-container");
const countdownForm=document.getElementById("countdownForm");
const dateEl=document.getElementById("date-picker");

const countdownEl=document.getElementById("countdown")
const countdownElTitle=document.getElementById("countdown-title")
const countdownBtn=document.getElementById("countdown-button")
const timeElements=document.querySelectorAll("span") //return an array of html elements

const completeEl=document.getElementById("complete");
const completeElInfo=document.getElementById("complete-info")
const completeBtn=document.getElementById("complete-info")

let countdownTitle="";
let countdownDate="";
let countdownValue= Date;
let countdownActive;
let savedCountdown={

}

const second=1000
const minute=second*60
const hour=minute*60
const day=hour*24

//set the date input minimum with dtodays day
const today=new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today)

//populate and complete countdown ui
function updateDOM(){
    countdownActive=setInterval(()=>{
        const now=new Date().getTime()
        const distance=countdownValue-now
    
        const days=Math.floor(distance/day)
        const hours=Math.floor((distance%day) / hour)
        const minutes=Math.floor((distance%hour) / minute)
        const seconds=Math.floor((distance%minute) / second)

        //hide input
        inputContainer.hidden=true
        
        //if countdown is ended
        if(distance<0){
            countdownEl.hidden=true
            clearInterval(countdownActive)
            completeElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden=false
        }else{
            //esle show countdown

            //populating countdown
            countdownElTitle.textContent=`${countdownTitle}`
            timeElements[0].textContent=`${days}`
            timeElements[1].textContent=`${hours}`
            timeElements[2].textContent=`${minutes}`
            timeElements[3].textContent=`${seconds}`
            completeEl.hidden=true
            countdownEl.hidden=false
        }
    },1000)
}

//take values from form inputs
function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value
    savedCountdown={
        title:countdownTitle,
        date:countdownDate,
    }
    localStorage.setItem("countdown",JSON.stringify(savedCountdown))
    //check valid date
    if(countdownDate===""){
        alert("please enter valid date")
    }else{
        //get the number version of current date
        countdownValue=new Date(countdownDate).getTime()
        updateDOM()
    }

}

//reset all values
function reset(){
    //hide countdown show input
    countdownEl.hidden=true
    completeEl.hidden=true
    inputContainer.hidden=false

    //stop the countdown
    clearInterval(countdownActive)

    //resdet values
    countdownTitle=""
    countdownDate=""
    localStorage.removeItem("countdown")

}

function restorePreviousCountdown(){
    //get countdown if its in local storage
    if(localStorage.getItem("countdown")){
        inputContainer.hidden=true
        savedCountdown=JSON.parse(localStorage.getItem("countdown"))
        countdownTitle=savedCountdown.title
        countdownDate=savedCountdown.date
        countdownValue=new Date(countdownDate).getTime()
        updateDOM()
    }
}


//event listner
countdownForm.addEventListener("submit", updateCountdown)
countdownBtn.addEventListener("click",reset)
completeBtn.addEventListener("click",reset)

//on load check local storage
restorePreviousCountdown()