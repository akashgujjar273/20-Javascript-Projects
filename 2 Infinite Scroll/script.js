//unsplash api
const count =10;
const apiKey=`gXc3lbVO5VS9kTCFc_3bdiX74oYRNgBkLTkd28iSUXY`
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
const imageContainer=document.getElementById("image-container")
const loader =document.getElementById("loader")
let photosArray=[]
let ready=false
let imagesLoaded=0;
let totalImages=0;

//check if all images were loaded
function imageLoaded(){
    imagesLoaded++
    if(imagesLoaded===totalImages){
        ready=true
        loader.hidden=true;
    }
}

//helper function
function setAttributes(element,attribute){
    for (const key in attribute){
        element.setAttribute(key, attribute[key])
    }
}

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length
    //run foreach method
    photosArray.forEach((photo)=>{
        //create and ancher (a)
        const item=document.createElement("a")
        // item.setAttribute("href",photo.links.html)
        // item.setAttribute("target","_blank")
        setAttributes(item,{
            href:photo.links.html,
            target:"_blank"
        })

        //create img

        const img=document.createElement("img")
        // img.setAttribute("src",photo.urls.regular)
        // img.setAttribute("alt",photo.alt_description)
        // img.setAttribute("title",photo.alt_description)

        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        //event listner check when each is loaded
        img.addEventListener("load",imageLoaded)
        //put image isnide <a> then put both inside the image container
        item.appendChild(img) //item is parent and we are adding a child 
        imageContainer.appendChild(item)
    })
}



//get photos from api

async function getPhotos(){
    try{
        const response= await fetch(apiUrl)
        photosArray= await response.json()
        displayPhotos()

    }catch(err){
        // alert(err.message)
        console.log(err)
    }
}

//check to see if scrollin is near bottom of page then load more images

window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >=document.body.offsetHeight - 1000 && ready){
        ready=false
        getPhotos()
    }
})

getPhotos()