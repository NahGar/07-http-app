
/**
 * @returns {Object} quote information
 */
const fetchQuote = async () => {

    //response no es el JSON, eso es el bpdy del response, response abarca mucho más
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');

    const data = await response.json();

    //porque devuelve un array con un único registro
    return data[0];
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp = async ( element ) => {

    document.querySelector("#app-title").innerHTML = "BreakingBad App";
    
    element.innerHTML = "Loading...";

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next quote';
    
    const renderQuote = ( data ) => {
        
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton);
    }

    const nextQuote = async () => {

        element.innerHTML = "Loading...";

        await fetchQuote()
           .then( renderQuote );
    }

    nextQuote();

    nextQuoteButton.addEventListener('click', async () => {
        
        await nextQuote();
        
    });
}