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

To fetch character data, I used the base API URL and appended the user’s search input using template literals. This allowed me to dynamically request information for whichever character the user typed in. After the request, I stored the response inside a variable called character so it would be easier to reference throughout the script. From there, I created additional variables to access specific pieces of information—such as the character’s bio, affiliation, race, and so on—using document.querySelector to insert the data into the corresponding sections of the page. Since the character object also contained nested objects for planets and transformations, I broke those out into separate variables as well.

Transformations were stored as an array in the API, so I used a forEach loop to generate and append each transformation to the list dynamically. To keep the UI clean, I also built a helper function that clears all displayed information before rendering new results. This helper function ties into my error handler and the piece of code that pops up to type in a certain amount of characters, so if a user searches for a character that doesn’t exist in the database, the page automatically clears and displays an appropriate error message.

## Optimizations
There are a lot of optimizations that I made on this project from when I tackled the characters section of the website which provided a template for the transformations and worlds. The first was that I had to create my own error pop up when I was first tackling the characters section in javascript. The API I used was structured like typical APIs since it was lacking it the usual checks and conventions. Even then I ran into some complications with even getting the error message and prompt to work. I was on the right track that it was tied to the character name, but everything else had me stumped. I was then that I checked the DOM and where it was supposed to show the name, it showed it as undefined. I checked the console on my browser and it had a small blurb and error showing it in a subtle way that the character wasn't in the database. I used my conditonal for the character name that if it equaled undefined, then the error message would pop up. After I did that, it worked. It forced me to reframe my logic into a different lens. I then used that knowledge when I was making the transformations and worlds website.

The next optimization that I made was to make the search engine searchable in english. The API I was using was in Spanish, meaning that the characters only preflected how they were in Spanish, and the only way to get the character information was their Spanish names since it only reflected in Spanish. I wanted it to be accessible in english, so I made a hashmap mapping the english name to the id number of the corresponding character. I also wanted it to be inlcusive of other languages that also included spanish, so I included the japanese names and spanish names too.
``` 
goku: 1,
"son goku": 1,
kakarot: 1,
kakarrot: 1,
```

I also had to create an english translation for the character bio since it was hard locked to being in Spanish. I first tried to have the description be translated to enlgish once the information pops up when you search the character but it didn't work. So I had to use a different method using the encodeURIComponent link from Google Translate to provide a link for it to be translated into enlgish. 

The last optimization that I had to do what actually fetching characters. I used this query parameter to try and get all the characters easily but it didn't provide the list of every character from that endpoint: `https://dragonball-api.com/api/characters?limit=58`. I had to step back in my logic until I saw on the api link the website gave was on the style of this: ```https://dragonball-api.com/api/characters/1```. The number at the end represented the character that was assigned that number. Since the character was tied to the id number from the characters endpoint I used, I can do the same for all the other characters as well and retrieve the information for every character on there. I created the hashmap to link the character name to the corresponding id number and came up with this solution that was able to search for all characters properly: ```https://dragonball-api.com/api/characters/${normalizedChoice}```.

## Lessons Learned:
This project taught me a lot about how APIs work, especially because the one I used wasn’t structured like most typical APIs. It lacked some of the usual checks and conventions, which forced me to think differently about my logic and adapt as I went. I ended up learning several new ways to extract and handle data, as well as how to render that information cleanly onto the DOM.

Working with an unconventional API pushed me to become more flexible in how I approach data retrieval and problem-solving. The experience gave me a stronger foundation and the confidence to work with a wide range of APIs in future projects. Looking back, the challenges were exactly the training I needed to prepare for more complex and structured APIs down the road.

## More Projects:
Feel free to explore some of my other projects in my portfolio:

**Ayesha Hair Salon:** [Ayesha Hair Salon](https://github.com/NomadCode33/DevChronicles/tree/main/Ayesha-Hair-Salon)

**Level Ground:** [Level Ground](https://github.com/NomadCode33/DevChronicles/tree/main/Level-Ground)

## Repositories
**Profile:** [NomadCode33](https://github.com/NomadCode33)

**DevChronicles Repository:** [DevChronicles](https://github.com/NomadCode33/DevChronicles)

**Main Repository:** [NomadGeo](https://github.com/NomadCode33/NomadGeo)
