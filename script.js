const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loading = document.getElementById('loading');



let apiQuotes = [];

// This function shows the page is loading
function loader(){
    loading.hidden = false;
    quoteContainer.hidden = true;
}
// This function will now hide the loading icon
function completeLoading(){
    quoteContainer.hidden = false;
    loading.hidden = true;
}

//This is where we will show the new quote
function newQuote(){
    loader();
    //This picks a random quote from the array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //This is to check if the author field is blank and give placeholder 'Unkown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }

    //This is to check quote length to determine text size
    if(quote.text.length > 150){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    //This section sets the quote and hides the loader
    quoteText.textContent = quote.text;
    completeLoading();
}

// This is where we will get Quotes from the API
async function getQuotes(){
    loader();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();

    } catch(error){
        // Catch any errors here in this section
    }
}

// This is used for tweeting out a quote from our application
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners rest here
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//On load
getQuotes();
