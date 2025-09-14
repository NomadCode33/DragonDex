//Example fetch using dragonball-api.com
document.querySelector('button').addEventListener('click', searchCharacter);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchCharacter();
    }
});

import { targetNameMap } from './config.js';

// function with the API that fetches character
function searchCharacter(){
  const choice = document.querySelector('input').value;
  const normalizedChoice = targetNameMap[choice.toLowerCase()] || choice.toLowerCase();
  const url = `https://dragonball-api.com/api/characters/${normalizedChoice}`;

// Fetches from the API
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        const character = data;
        const planet = character.originPlanet;
        const transformations = character.transformations;
        const description = character.description;
        const translatedLink = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(description)}&op=translate`;
        const charNotFound = document.getElementById('charNotFound');

        // Block single letter
        if (choice.length < 2) {
          charNotFound.style.display = 'block';
          charNotFound.innerText = 'Please enter at least 2 characters.';
          clearCharacterInfo();
          return;
        } 
        
        if (character.name === undefined) {
          charNotFound.style.display = 'block';
          charNotFound.innerText = `'${choice}' not found`;
          clearCharacterInfo();
          return;
        } 
        // Character not found display info set to none when valid character pops up
        charNotFound.style.display = 'none';
        
        // Valid character
        document.querySelector('.char-name').innerText = character.name;
        document.querySelector('.char-pic').src = character.image;
        document.getElementById('footer-img').style.display = 'none';
        
        document.querySelector('.description').innerHTML = `
        <p>${description}</p>
        <a href="${translatedLink}" target="_blank">Translate to English</a>`;
        
        document.querySelector('.gender').innerText = character.gender;
        document.querySelector('.race').innerText = character.race;
        document.querySelector('.planet').innerText = planet.name;
        document.querySelector('.affiliation').innerText = character.affiliation;
        document.querySelector('.ki').innerText = character.ki;
        document.querySelector('.max-ki').innerText = character.maxKi;
        
        const transformList = document.querySelector('ul'); // or use '.transform' if you want to be more specific

        // Clear the list before adding new transformations
        transformList.innerHTML = '';

        // Check if there are transformations BEFORE looping
        if (transformations.length > 0) {
          transformations.forEach(obj => {
            const li = document.createElement('li');
            li.textContent = obj.name;
            transformList.appendChild(li);
          });
        } else {
          transformList.innerHTML = '<li>No Transformations</li>';
        }
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}

// When characters are less than 2 in search box, 
// it clears up the information in the character bio box
function clearCharacterInfo() {
  document.querySelector('.char-name').innerText = 'Name';
  document.querySelector('.char-pic').src = '';
  document.querySelector('.description').innerHTML = '';
  document.querySelector('.gender').innerText = '';
  document.querySelector('.race').innerText = '';
  document.querySelector('.planet').innerText = '';
  document.querySelector('.affiliation').innerText = '';
  document.querySelector('.ki').innerText = '';
  document.querySelector('.max-ki').innerText = '';
  document.querySelector('.transform').innerText = '';
}

// filters through data find the name that includes what was searched for (choice)
function findExactCharacter(data, choice) {
  return data.find(char => char.name.toLowerCase() === choice);
}