# DragonDex
DragonDex is a responsive web app and interactive encyclopedia for the Dragon Ball universe, using a third-party API for dynamic search across characters, transformations, and worlds.

**Link to project:** https://dragondex.netlify.app/

<img src="./img/DragonDex.png" img alt = "DragonDex Website"/>

## How It's Made:

**Tech used:** <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer"> <img alt="HTML5 Badge" src="https://img.shields.io/badge/-HTML5-000000?style=flat&logo=HTML5"></a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer"> <img alt="CSS3 Badge" src="https://img.shields.io/badge/-CSS3-000000?style=flat&logo=CSS"></a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img alt="JavaScript Badge" src="https://img.shields.io/badge/-JavaScript-000000?style=flat&logo=JavaScript"></a>

I built three separate API-driven search websites, each focused on a different part of the dataset: characters, transformations, and worlds. Since the workflow for all three was essentially the same, I structured each section with its own HTML, CSS, and JavaScript files to keep the project organized and modular.

For the Character API, I included both the associated planets and transformations tied to each character. I wanted users to easily see where each character comes from and how many transformations they have, even though the planets and transformations would eventually have their own dedicated pages with more in-depth information. This approach allowed me to keep the character pages simple while still showing meaningful connections across the API.

I started by building the foundational HTML, mirroring the structure and attributes provided by the API. I also added a search box so users could look up any character directly.

Example snippet from the search section:
```
<section class="search-box">
  <div class="text-content">
    <h1 class="bangers">DragonBall: Z-Radar</h1>
    <p>Type in a character</p>
    <p>List of names are found <a href="https://docs.google.com/document/d/1R74fonqqks_SnkI_7is8b5pRiDtROH9A5ebAFTravhU/edit?usp=sharing" target="_blank" rel="noreferrer">here</a></p>
    <input type="text" name="" value="">
    <button type="button" class="src-btn" name="button">Get Character</button>
  </div>
</section>
```
And an example of how I structured the character details:
```
<section class="text">
  <h2 class="bangers">Bio: <span class="description reg-font"></span></h2>
  <h2 class="bangers">Gender: <span class="gender reg-font"></span></h2>
  <h2 class="bangers">Race: <span class="race reg-font"></span></h2>
  <h2 class="bangers">Associated Planet: <span class="planet reg-font"></span></h2>
  <h2 class="bangers">Affiliation: <span class="affiliation reg-font"></span></h2>
  <h2 class="bangers">Ki: <span class="ki reg-font"></span></h2>
  <h2 class="bangers">Max Ki: <span class="max-ki reg-font"></span></h2>
  <h2 class="bangers transform-head">Transformation(s):</h2>
  <ul class="transform reg-font"></ul>
<section>
```

To fetch character data, I used the base API URL and appended the user’s search input using template literals. This allowed me to dynamically request information for whichever character the user typed in. After the request, I stored the response inside a variable called character so it would be easier to reference throughout the script.

From there, I created additional variables to access specific pieces of information—such as the character’s bio, affiliation, race, and so on—using document.querySelector to insert the data into the corresponding sections of the page. Since the character object also contained nested objects for planets and transformations, I broke those out into separate variables as well.

Transformations were stored as an array in the API, so I used a forEach loop to generate and append each transformation to the list dynamically. To keep the UI clean, I also built a helper function that clears all displayed information before rendering new results. This helper function ties into my error handler, so if a user searches for a character that doesn’t exist in the database, the page automatically clears and displays an appropriate error message.

## Optimizations
I had to create my own error since the API I used didn't have the normal errors on there
From that error I realized I was having trouble with getting the error to pop up, until I saw on the DOM itself that it said undefined
I made a config js file to create a hashmap of all the different search terms. Since the only way to properly search it was in Spanish
I also had to create code to create a translation for the character bio since it was hard locked to being in Spanish
Talk about the manuevering about it when I ran into a roadblock

## Lessons Learned:


## Examples:
