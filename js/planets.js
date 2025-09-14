//Example fetch using dragonball-api.com
document.querySelector('button').addEventListener('click', searchCelestial);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchCelestial();
    }
});

import { targetCelestialBodyMap } from './config.js';

// function with the API that fetches character
function searchCelestial(){
  const choice = document.querySelector('input').value;
  const normalizedChoice = targetCelestialBodyMap[choice.toLowerCase()] || choice.toLowerCase();
  const url = `https://dragonball-api.com/api/planets/${normalizedChoice}`;

// Fetches from the API
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        const celestialBody = data;
        const celestialBeings = celestialBody.characters;
        const description = celestialBody.description;
        const translatedLink = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(description)}&op=translate`;
        const planetNotFound = document.getElementById('planetNotFound');

        // Block single letter
        if (choice.length < 2) {
          planetNotFound.style.display = 'block';
          planetNotFound.innerText = 'Please enter at least 2 characters.';
          clearCelestialInfo();
          return;
        } 
        
        // If the name of planet is undefined, then it throws an error
        if (celestialBody.name === undefined) {
          planetNotFound.style.display = 'block';
          planetNotFound.innerText = `'${choice}' not found`;
          clearCelestialInfo();
          return;
        } 

        // Character not found display info set to none when valid character pops up
        planetNotFound.style.display = 'none';
        
        // Valid character
        document.querySelector('.planet-name').innerText = celestialBody.name;
        document.querySelector('.planet-pic').src = celestialBody.image;
        document.getElementById('footer-img').style.display = 'none';
        
        document.querySelector('.description').innerHTML = `
        <p>${description}</p>
        <a href="${translatedLink}" target="_blank">Translate to English</a>`;
        
        const residesList = document.querySelector('.celest');

        // Clear the list before adding new character
        residesList.innerHTML = '';

        // Check if there are characters BEFORE looping
        if (celestialBeings.length > 0) {
          celestialBeings.forEach(obj => {
            const li = document.createElement('li');
            li.textContent = obj.name;
            residesList.appendChild(li);
          });
        } else {
          residesList.innerHTML = '<li>No Characters</li>';
        }
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}

// When characters are less than 2 in search box, 
// it clears up the information in the planet bio box
function clearCelestialInfo() {
  document.querySelector('.planet-name').innerText = 'Planet';
  document.querySelector('.planet-pic').src = '';
  document.querySelector('.description').innerHTML = '';
  document.querySelector('.celest').innerText = '';
}

// filters through data find the name that includes what was searched for (choice)
function findExactCharacter(data, choice) {
  return data.find(char => char.name.toLowerCase() === choice);
}