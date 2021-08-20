const videoelement=document.getElementById("video")
const button = document.getElementById("button")

// prompt user to select a media stream pass to video elemtn then play

async function selectMediaStream(){
    try{
        const mediaStream=await navigator.mediaDevices.getDisplayMedia()
        videoelement.srcObject=mediaStream
        videoelement.onloadedmetadata=()=>{
            videoelement.play();
        }

    }catch (err){
        console.log(err)
    }
}

button.addEventListener("click",async ()=>{
    //disable the button
    button.disabled=true;
    //start picture in picture
    await videoelement.requestPictureInPicture()

    //reset button
    button.disabled=false;
});

//on load
selectMediaStream();