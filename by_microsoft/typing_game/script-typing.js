// all quotes

const quotes = ['When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',];


let words = [];
let wordIndex = 0;

// The starting time

let startTime = Date.now();

// page elements

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const modal = document.getElementById('myModal');
const btn = document.getElementById('btnModal');
const span = document.getElementsByClassName('close')[0];
localStorage.setItem('highScore', '0');
let highScore = localStorage.getItem('highScore');

// Start logic

document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    typedValueElement.disabled = false;

    // UI updates
    // Create an array of span elements so we cat set a class
    const spanWords = words.map(function (word) { return `<span> ${word} </span>` });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word 
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.InnerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // Set the event handler

    // Start the timer
    startTime = new Date().getTime();
});

// at the end of script.js
typedValueElement.addEventListener('input', func = () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    var elapsedTime = new Date().getTime() - startTime;
    
    localStorage.setItem('score', elapsedTime);
    let score = localStorage.getItem('score');
 
    if (score < highScore || highScore == 0) {
      localStorage.setItem('highScore', elapsedTime);
      highScore = localStorage.getItem('highScore');
    }


    const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} 
    seconds. Score is: ${score}. Record is : ${highScore}`;
    messageElement.innerText = message;
    typedValueElement.disabled = true;
    modal.style.display = 'block';
    span.onclick = function()  {
      modal.style.display = 'none';
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none'
      }
    }

  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});
