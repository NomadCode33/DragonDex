//Example fetch using dragonball-api.com
document.querySelector('button').addEventListener('click', searchTransformation);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchTransformation();
    }
});

import { targetTransformationMap } from './config.js';

// function with the API that fetches transformation
function searchTransformation(){
  const choice = document.querySelector('input').value;
  const normalizedChoice = targetTransformationMap[choice.toLowerCase()] || choice.toLowerCase();
  const url = `https://dragonball-api.com/api/transformations/${normalizedChoice}`;

// Fetches from the API
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        const transformation = data;
        const charNotFound = document.getElementById('charNotFound');

        //const valid = findExactCharacter(data, normalizedChoice)
        // Block single letter
        if (choice.length < 2) {
          charNotFound.style.display = 'block';
          charNotFound.innerText = 'Please enter at least 2 characters.';
          clearCharacterInfo();
          return;
        } 
        
        if (transformation.name === undefined) {
          charNotFound.style.display = 'block';
          charNotFound.innerText = `'${choice}' not found`;
          clearCharacterInfo();
          return;
        } 
        /*if (!valid) {
          charNotFound.style.display = 'block';
          charNotFound.innerText = `Character not found`;
          clearCharacterInfo();
          return;
        }*/

        // Character not found display info set to none when valid character pops up
        charNotFound.style.display = 'none';
        
        // Valid character
        document.querySelector('.char-name').innerText = transformation.name;
        document.querySelector('.char-pic').src = transformation.image;
        document.getElementById('footer-img').style.display = 'none';
        document.querySelector('.ki').innerText = transformation.ki;
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}

// When characters are less than 2 in search box, 
// it clears up the information in the character bio box
function clearCharacterInfo() {
  document.querySelector('.char-name').innerText = 'Transformation';
  document.querySelector('.char-pic').src = '';
  document.querySelector('.ki').innerText = '';
}

// filters through data find the name that includes what was searched for (choice)
function findExactCharacter(data, choice) {
  return data.find(char => char.name.toLowerCase() === choice);
}