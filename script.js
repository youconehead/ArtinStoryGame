
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
// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  gym: {
    title: "Abandoned School: Gym",
    character: "Meet Trader",
    text: `You wake up on a hard wood floor of a school’s gym. Broken glass shards and trashed equipment lay around you. You aren’t sure how you got here, but you recall passing out on a sidewalk.
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
        nextScene: "man"
      },
      {
        text: "Explore outside the gym",
        nextScene: "hallway"
      }
    ]
  },

  tutorial: {
    title: "tutorial",
    character: "",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the dog",
        nextScene: "trader"
      },
         {
        text: "Ask about the neighbor",
        nextScene: "gym"
      }
    ]
  },

  trader: {
    title: "trader",
    text: "heya",
    choices: [
      {
        text: "gym",
        nextScene: "gym"
      }
    ]
  },
  man: {
    title: "man",
    text: "ello i am man.",
    choices: [
      {
        text: "gym",
        nextScene: "gym"
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
    
  }
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
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

