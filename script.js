
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
          updateResources(25);
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
        text: "Go back",
        nextScene: "gym"
      },
         {
        text: "The store",
        nextScene: "trader"
      }
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
        text: "Clue",
        nextScene: "clue1"
      },
      {
        text: "Master Key (20 resources)",
        action: function() {
        if(resources >=20 ){
          pickUpItem("Master Key");
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
    title: "Clue",
    text: `“You should watch out for Skinny kid, he reeks of something foul.”
    <br></br>
    “The smell probably means something.”
    "`,
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
    text: "wip",
    choices: [
      {
        text: "Go back",
        nextScene: "trader"
      }
    ]
  }, 
  man: {
    title: "Meet man",
    text:  `“Whats good, I’m just a chillawg man who doesn’t do anything”
    <br></br>
    <b>“...”</b>
    <br></br>
    “Stop staring man, just take this and scram.”`,

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
      },
    ]
  },
  library: {
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
  cafeteria: {
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
  classroom: {
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
  moreHallway: {
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

