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

Transformations were stored as an array in the API, so I used a forEach loop to generate and append each transformation to the list dynamically. To keep the UI clean, I also built a helper function that clears all displayed information before rendering new results. This helper function works together with my error handler and the character-length validation, ensuring that if a user enters an invalid name or searches for a character that doesn’t exist in the database, the page automatically clears and displays the appropriate error message.

## Optimizations
Throughout this project, I made several optimizations as I moved from the Characters page to the Transformations and Worlds sections. The Characters section became the foundation and template for everything that followed, but it also exposed most of the challenges I had to solve early on.

One of the first issues I encountered was creating my own error pop-up in JavaScript. The API I used wasn’t structured like a typical API—it lacked many of the usual checks, safeguards, and conventions—so I had to build my own logic for handling invalid searches. At first, I struggled to get the error message to trigger correctly. I suspected the issue had something to do with the character name, but everything else seemed fine on the surface.

That’s when I checked the DOM. The field where the character’s name should have appeared was showing as `undefined`. After checking the browser console, I noticed a subtle error indicating that the character simply didn’t exist in the database. That’s when it clicked: I could use a conditional that checked whether the character name equaled undefined. If it did, the custom error message would activate. Once I implemented that condition, everything worked smoothly. Solving this forced me to shift my logic and look at the API from a completely different angle—knowledge that directly helped when I moved on to building the Transformations and Worlds pages.

Another key optimization was making the search engine usable in English. The API’s data was entirely in Spanish, which meant the only way to retrieve characters was by using their Spanish names. I wanted the project to be accessible in English while still being inclusive of other languages, so I created a hashmap that mapped English names—and even Japanese and Spanish variations—to the corresponding character ID numbers. For example:
``` 
goku: 1,
"son goku": 1,
kakarot: 1,
kakarrot: 1,
```
This allowed users to search using the name they were most familiar with, regardless of language.

I also had to create an english translation for the character bio since it was hard locked to being in Spanish. I first tried to have the description be translated to enlgish once the information pops up when you search the character but it didn't work. So I had to use a different method using the `encodeURIComponent` link from Google Translate to provide a link for it to be translated into english. 

The final optimization I made involved actually fetching the characters correctly. At first, I tried using a query parameter to get the full list of characters: 
```
https://dragonball-api.com/api/characters?limit=58
```

However, this endpoint didn’t return every character the way I expected, so I had to rethink my approach. After revisiting the API structure, I noticed that one of the example links on the website followed a different pattern: 
```
https://dragonball-api.com/api/characters/1
```

The number at the end represented the character’s ID, which matched the IDs used in the main characters endpoint. Once I understood that, it clicked: if each character could be fetched directly by ID, then I could use that pattern to reliably retrieve any character in the database. That’s when the hashmap I created became essential. By mapping each character’s name—across English, Spanish, and Japanese variations—to its corresponding ID, I could dynamically build the correct URL for any search. This led to the final solution: 
```
https://dragonball-api.com/api/characters/${normalizedChoice}
```

Using the normalized choice from the hashmap ensured that every character could be fetched properly, regardless of the language the user typed in.

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
