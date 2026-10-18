
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "gym";
let tutorialDone = false;
let manTalk = false;
let clueProgress = 1;
// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
gym: { // GYM SECTION
    title: "Abandoned School: Gym",
    character: "Meet Trader",
    text: `<img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/abandoned-school-gymnasium-dylan-murphy.jpg" width="300" alt="abandoned school">
    <br></br>
    You wake up on a hard wood floor of a school’s gym. Broken glass shards and trashed equipment lay around you. You aren’t sure how you got here, but you recall passing out on a sidewalk.
    <br></br>
    A short, brown haired boy stares at you while you lie there.
    <br></br>
    “Hey you, you’re a newcomer here huh?”
    <br></br>
    “Welcome to the Endless Halls”
    <br></br>
    <b>“What is this place?”</b>
    <br></br>
    “A pretty much endless school; although it has some quirks”
    <br></br>
    <b>“Like what?”</b>
    <br></br>
    “As you noticed, everything is basically abandoned here, all the rooms and stuff are like damaged in random places.”
    <br></br>
    “Some of the rooms are pretty dim, so be careful”
    <br></br>
    “Anyway, if you want to see me then come to my shop, I could help you out if you need some guidance.”
    <br></br>
    “Oh I’m a Trader also.”
    `,
    
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Trader's Store",
        action: function () {
         if (tutorialDone){
          updateScene("trader");
         }
         else{
          tutorialDone=true;
          updateScene("tutorial");
         }

        },
      },
      {
        text: "Talk to random man",
        action: function() {
        if(!manTalk){
          manTalk = true;
          updateResources(10);
          updateScene("man");
        }
        else{
          updateScene("no");
        }
        },
        
        
      },
      {
        text: "Explore outside the gym",
        nextScene: "hallway"
      }
    ]
  },

  tutorial: {
    title: "Tutorial",
    character: "",
    text: `“Hello, this is a guide to the Endless Halls.”
  <br></br>
  “Be safe when you explore the halls, it’s less safe than in here.”
  <br></br>
  “...”
  <br></br>
  “Many people choose to camp around some of the rooms even though it’s dangerous out there.”
  <br></br>
  “You should get acquainted with some of them, and also collect resources. I sell things for the stuff you will bring me.”
  <br></br>
  “There are people who are going missing recently, maybe you could solve this mystery.”
  `,
    choices: [
      {
        text: "The store",
        nextScene: "trader"
      },
      {
        text: "Go back",
        nextScene: "gym"
      },
    ]
  },

  trader: {
    title: "Trader",
    text: `“Hey! You tryin’ to buy something?”`,
    choices: [
      {
        text: "Buy something",
        nextScene: "purchase"
      },
      {
        text: "Accuse someone",
        nextScene: "accuse"
      },
      {
        text: "Go back",
        nextScene: "gym"
      },
    ]
  },
  purchase: {
    title: "Purchase something",
    text: "“What do you want to buy?”",
    choices: [
      {
        text: "Buy one clue (5 resources)",
        action: function(){
        if(resources >= 5){
          if(clueProgress==3){
            updateScene("clue3");
            updateResources(-5);
            clueProgress=1;
          }
          else if(clueProgress==2){
            updateScene("clue2");
            updateResources(-5);
            clueProgress=3;
          }
          else if(clueProgress==1){
            updateScene("clue1");
            updateResources(-5);
            clueProgress=2;
          }
        }
        else{
          updateScene("cant");
        }
      }
      },
      {
        text: "Master Key (20 resources)",
        action: function() {
        if(resources >=20 ){
          pickUpItem("Master key");
          updateScene("masterKey");
          updateResources(-20);
        }
        else {
          updateScene("cant");
        }
        },
      },
      {
        text: "Go back",
        nextScene: "trader"
      },
    ]
  }, 
  clue1: {
    title: "Clue 1",
    text: `“You should watch out for Skinny kid, he goes by the cafeteria, and he reeks of something foul.”
    <br></br>
    “The smell probably means something.”
    <br></br>
    (2 more clues available)
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "purchase"
      }
    ]
  },
  clue2: {
    title: "Clue 2",
    text: `“I don’t know, why is the Quiet kid always in there?”
    <br></br>
    “Are they hiding something?”
    <br></br>
    (1 more clue available)
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "purchase"
      }
    ]
  },
  clue3: {
    title: "Clue 3",
    text: `“A customer walked to my store, he complained about some smell in the hallways.”
    <br></br>
    “That’s where Jock is usually at, but I’m not sure.”
    <br></br>
    (clue order resets)
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "purchase"
      }
    ]
  },
  masterKey: {
    title: "Master Key",
    text: "You bought a master key.",
    choices: [
      {
        text: "Go back",
        nextScene: "purchase"
      }
    ]
  },
  cant: {
    title: "nope",
    text: "you can't afford this",
    choices: [
      {
        text: "Go back",
        nextScene: "purchase"
      }
    ]
  }, 
  accuse: { //for LATER
    title: "Accuse Someone",
    text: "“Wait, you mean you know who did it? Who?”",
    choices: [
      {
        text: "Jock",
        nextScene: "badEnd"
      },
      {
        text: "Quiet kid",
        nextScene: "badEnd"
      },
      {
        text: "Skinny kid",
        nextScene: "badEnd"
      },
      {
        text: "Guy",
        nextScene: "badEnd"
      },
      {
        text: "Man",
        nextScene: "badEnd"
      },
      {
        text: "Trader",
        action: function(){
          if(inventory.includes("Tracking list") && inventory.includes("Last words") && inventory.includes("Torn page")){
            updateScene("neutralEnd");
          }
          else{
            updateScene("nuhUh");
          }
        }
      },
      {
        text: "Go back",
        nextScene: "trader"
      }
    ]
  }, 
  badEnd: {
    title: "Bad ending",
    text: "You rat out the wrong student, and you are punished by being outcasted for eternity.",
  },
  nuhUh: {
    title: "Trader",
    text: `“Why would it be me? There is no evidence that it would be me.”
    <br></br>
    (trader is acting a little suspicious, i need to collect enough evidence... (3 required))
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "accuse"
      }
    ]
  },
  neutralEnd: {
    title: "Neutral ending",
    text: `“Me..? And you have the evidence for it...”
    <br></br>
    He grabs his bag and runs into the halls.
    <br></br>
    Although nobody ever finds him, no more incidents happen after that.
    <br></br>
    Guess that was enough.
    `,
  },
  man: {
    title: "Meet man",
    text:  `“Whats good, I’m just a chillawg man who doesn’t do anything”
    <br></br>
    <b>“...”</b>
    <br></br>
    “Stop staring man, just take this and scram.”
    <br></br>
    (earned 10 Resources)`,

    choices: [
      {
        text: "Go back",
        
        nextScene: "gym"
      }
    ]
  },
  no: {
    title: "no",
    text: "don't talk to me buddy",
    choices: [
      {
        text: "Go back",
        nextScene: "gym"
      }
    ]
  },
  hallway: { // HALLWAY SECTION
    title: "Hallway",
    text: "You are in the hallway, there are many locations to walk to.",
    choices: [
      {
        text: "Jock",
        nextScene: "jock"
      },
      {
        text: "Library",
        nextScene: "library"
      },
      {
        text: "Cafeteria",
        nextScene: "cafeteria"
      },
      {
        text: "Classroom",
        nextScene: "classroom"
      },
      {
        text: "More hallway",
        nextScene: "moreHallway"
      },
      {
        text: "Back to gym",
        nextScene: "gym"
      },
    ]
  }, 
  
  jock: {
    title: "Jock",
    text: `A tall black messy haired guy stands idly posing on a broken locker.
    <br></br>
    “Yo what’s up, you know that people are going missing?.”
    <br></br>
    <b>“I’ve heard.”</b>
    <br></br>
    “Yea, you know that it might be someone causing this?”
    <br></br>
    <b>“Hm.”</b>
    <br></br>
    “I’m suspicious of the people around here.”
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "hallway"
      },
    ]
  },
  library: {
    title: "Library",
    text: `The library is surprisingly clean compared to the rest of the school. Most of the books remain neatly organized.
    <br></br>
    A black haired girl with reading glasses sits at a table examining a book.
`,
    choices: [
      {
        text: "Approach quiet kid",
        action: function(){
          if(inventory.includes("Torn page")){
            updateScene("YESquietKid");
          }
          else{
            updateScene("NOquietKid");
          }
          
        }
      },
      {
        text: "Examine bookshelf ",
        nextScene: "examine"
      },
      {
        text: "Go back",
        nextScene: "hallway"
      },
    ]
  },
  NOquietKid: {
    title: "Quiet Kid doesnt't notice",
    text: `You approach and the girl doesn’t notice you.
    <br></br>
    <b>“Hello?”</b>
    <br></br>
    “.....”
    <br></br>
    <b>“Alright then.”</b>
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "library"
      }
    ]
  },
  YESquietKid: {
    title: "Quiet Kid notices",
    text: `<b>“Hello? I found a ripped piece of paper.”</b>
    <br></br>
    “What? Did somebody cause problems in the library again?!”
    <br></br>
    <b>“How is this library so clean anyway?”</b>
    <br></br>
    “I make sure it’s clean all the time.”
    <br></br>
    <b>“Do you know anything about the missing people?”</b>
    <br></br>
    “No, I’m usually here by myself.”
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "library"
      }
    ]
  },
  examine: {
    title: "Examine bookshelf",
    text: "You see neatly placed books labeled in different genres. However, you notice a misaligned book with a piece of paper sticking out.",
    choices: [
      {
        text: "Take the book",
        action: function() {
          pickUpItem("Torn page");
          updateScene("bookRecieve");
      }
      },
      {
        text: "Go back",
        nextScene: "library"
      }
    ]
  },
  bookRecieve: {
    title: "Found",
    text: `You grab a book and a piece of paper falls from it.
    <br></br>
    You read the piece…
    <br></br>
    “...someone is keeping track of us.”
    <br></br>
    “- Bud…”
    <br></br>
    The words end where it was ripped.
    <br></br>
    Maybe the quiet kid will say something with this.
    <br></br>
    (torn page received)
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "library"
      }
    ]
  },

  cafeteria: {
    title: "Cafeteria",
    text: `You enter the cafeteria and see some broken lunch tables and smashed counters.
    <br></br>
    You also see a thin skinny kid who is scavenging for food.
    `,
    choices: [
      {
        text: "Approach the skinny kid",
        nextScene: "skinnyKid"
      },
      {
        text: "Scavenge",
        action: function(){
          updateResources(3);
        }
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
  skinnyKid: {
    title: "Skinny Kid",
    text: `“oh hey, didn’t see you there.”
    <br></br>
    <b>“What are you doing?”</b>
    <br></br>
    “Just looking for some scraps.”
    <br></br>
    <b>“What's that smell? It smells like something died.”</b>
    <br></br>
    “oh yeah, thats me.”
`,
    choices: [
      {
        text: "Go back",
        nextScene: "cafeteria"
      }
    ]
  },
  classroom: {
    title: "Classroom",
    text: "You enter a classroom and see a Guy sitting on a teachers desk.",
    choices: [
      {
        text: "Approach",
        nextScene: "guy"
      },
      {
        text: "Scavenge",
        action: function(){
        pickUpItem("Tracking list");
        updateScene("list")
        }
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
  guy: {
    title: "Guy",
    text: `“Oh hey, you new here buddy?”
    <br></br>
    “I’m just chilling here”
    <br></br>
    “...”
    <br></br>
    “Are you looking for something?”
    <br></br>
    “Nothing much here except for paper scraps.”
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "classroom"
      }
    ]
  },
  list: {
    title: "Found",
    text: `There's a bunch of random homework assignments about algebra… but you see a list that stands out.
    <br></br>
    <br></br>
    <u>Student’s locations</u>
    <br></br>
    <s>Buddy (hallway)</s> <= <b>“Come to think of it, I haven't seen this guy at all. It has to be someone who keeps track of people, but who?”</b>
    <br></br>
    Jock (hallway)
    <br></br>
    Quiet Kid (library)
    <br></br>
    Skinny kid (cafeteria)
    <br></br>
    Guy (classroom)
    <br></br>
    Man (gym)
    `,
    choices: [
      {
        text: "Go back",
        nextScene: "classroom"
      }
    ]
  },
  moreHallway: {
    title: "More hallway",
    text: `You walk through the halls, avoiding the locker walls that lay on the floor.
    <br></br>
    The hallway is pretty cramped. 
    <br></br>
    Oh, but you see a boy run past complaining.
    <br></br>
    “Yo, it stinks over here! I think it’s coming from the janitor closet.”
    `,
    choices: [
      {
        text: "Open the janitor door",
        action: function(){
          if(inventory.includes("Master key")){
            updateScene("open");
            pickUpItem("Last words");
          }
          else{
            updateScene("tried");
          }
        }
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
open: {
    title: "Janitor closet",
    text: `You use the key and turn the door knob to see a diseased person along with several notes.
    <br></br>
    ‘Someone kidnapped me and now im stuck in this closet’
    <br></br>
    ‘Don't know how, but they probably knew where I was going.’
    <br></br>
    ‘I knew somebody was tracking me, but I wasn’t able to explain it to the others in time.’
    <br></br>
    ‘farewell’
    <br></br>
    (Last words added to inventory)
`,
    choices: [
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
tried: {
    title: "nope",
    text: "The door doesn’t budge, maybe you need to get a key.",
    choices: [
      {
        text: "Go back",
        nextScene: "moreHallway"
      }
    ]
  },
  placeholder: {
    title: "",
    text: "",
    choices: [
      {
        text: "",
        nextScene: ""
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },














   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "backyard"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  },
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.innerHTML = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let resources = 0;

// Display current health
const resourcesDisplay = document.getElementById("resources-display");

// Create a function to update health 
function updateResources(amount) {
  resources += amount;
  resourcesDisplay.textContent = resources;
}

// This refreshes the health display
updateResources(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("Master Key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

