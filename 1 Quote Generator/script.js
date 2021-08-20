const QuoteContainer=document.getElementById("quote-container")
const Quote=document.getElementById("quote")
const QuoteAuthor=document.getElementById("author")
const QuoteGeneratorButton=document.getElementById("new-quote")
const TwitterBtn=document.getElementById("twitter")
const loader=document.getElementById("loader")

let ApiQuotes=[]
let quotes

//loader
function loading() {
    loader.hidden=false
    QuoteContainer.hidden=true
}
//complete loading
function complete(){
    QuoteContainer.hidden=false
    loader.hidden=true
}

//generating random quote
const randomquote=function(){
    loading()
    let random=Math.floor(Math.random()* ApiQuotes.length)+1
    //getting quote for a random index
    quotes=ApiQuotes[random]

    //changing quote
    if(Quote.textContent.length>100){
        Quote.classList.add("long-quote")
    }else{
        Quote.classList.remove("long-quote")
    }
    
    Quote.textContent=quotes.text
    QuoteAuthor.textContent=quotes.author ? quotes.author : "Unknown"
    complete()
}

//  Get quotes from api
const GetQuotes=async function(){
    loading()
    const Url="https://type.fit/api/quotes"
    try{
        const data= await fetch(Url)
        ApiQuotes =await data.json()
        randomquote()
        //array of quotes
        // console.log(ApiQuotes)
    }catch(err){
        alert(err)
    }
}
GetQuotes()


//tweet quote
function TweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${Quote.textContent} - ${QuoteAuthor.textContent}`
    window.open(twitterUrl,"_blank")
}

//event listners
QuoteGeneratorButton.addEventListener("click",randomquote)
TwitterBtn.addEventListener("click",function(e){
    // console.log(e.target.closest("#twitter"))
    button=e.target.closest("#twitter")
    if(button) TweetQuote()
})
