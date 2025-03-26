const heading = document.getElementById('title');
const joke = document.getElementById('Joke');


heading.textContent = "Joke of the Day";
joke.textContent = "Loading . . .";

function fetchJoke(category) {
    const url = `https://v2.jokeapi.dev/joke/${category}?safe-mode`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.type === 'single') {
                joke.textContent = data.joke;
            } else if (data.type === 'twopart') {
                joke.textContent = `${data.setup} ... ${data.delivery}`;
            } else {
                joke.textContent = "Something went wrong... Please try again.";
            }
        })

        .catch(error => {
            joke.textContent = "Error. Please try again.";
            console.error(error);
        });
}

fetchJoke('Any');
 
const categories = {
    programming: 'Programming',
    miscellaneous: 'Miscellaneous',
    pun: 'Pun',
    spooky: 'Spooky',
    christmas: 'Christmas'
};

for (const [key, value] of Object.entries(categories)) {
    const button = document.getElementById(key);
    button.addEventListener('click', function() {
        heading.textContent = key === 'pun' ? "A Random Pun" : `A Random ${value} Joke`;
        fetchJoke(key === 'pun' ? 'pun' : key);
    });
}
