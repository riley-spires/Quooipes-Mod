const EntityArmorStandClass = Java.type('net.minecraft.entity.decoration.ArmorStandEntity').class;
const useItemBind = Client.getKeyBindFromDescription("key.use");

import Settings from "./config"

const notifictionText = new Text("").setScale(2);

let detected = false;
let caught = false;
let treasureCaught = false;
let count = 0;
let targetCount = Math.floor(rand(1, Settings.maxFish));
let guiOpen = false;

register("command", () => Settings.openGUI()).setName("quoopiesmod").setAliases(["qm"]);

register("guiOpened", () => {
    guiOpen = true
})

register("guiClosed", () => {
    guiOpen = false;
})

register("tick", () => {
    if (!Settings.enabled) return;

    if (!guiOpen && count !== 0 && count >= targetCount) {
        if (Settings.statusUpdatesEnabled) {
            ChatLib.chat("&c[Quoopie's Mod] Moving cursor...");
        }

        // Calculate total movement we want
        const totalYawAdjust = rand(-2, 2);
        const totalPitchAdjust = 0; // Small pitch movement too
        
        // Break movement into smooth steps
        smoothRotatePlayer(totalYawAdjust, totalPitchAdjust, 100); // 500ms duration
        
        count = 0;
        targetCount = Math.floor(rand(1, Settings.maxFish));
    }

    World.getAllEntitiesOfType(EntityArmorStandClass).forEach((entity) => {
        if (!caught && entity.getName() === "!!!") {
            detected = false;
            caught = true;
            count += 1;
            
            if (!guiOpen) {
                pressAndReleaseSequence(2, 100);
            }

            if (Settings.statusUpdatesEnabled) {
                ChatLib.chat("&a[Quoopie's Mod] Reeled in a fish!");
            }
        } else if (!detected && entity.getName() === "?") {
            detected = true;
            caught = false;
            if (Settings.statusUpdatesEnabled) {
                ChatLib.chat("&e[Quoopie's Mod] Detected a fish! Waiting...");
            }
        }
    })
});

register("clicked", (x, y, button, pressed) => {
    if (button === 1 && pressed && detected) {
        setTimeout(reset, 100);
    }
});

register("worldLoad", () => {
    reset();
})

register("chat", (rarity, treasure, event) => {
    if (Settings.treasureNotifEnabled) {
        treasureCaught = true;
        let rcc = "&"

        switch (rarity) {
            case "GOOD":
                rcc += "5"
                break;
            case "GREAT":
                rcc += "6"
                break;
            case "OUTSTANDING":
                rcc += "d";
                break;
        }

        notifictionText.setString(`${rcc}${rarity}&r : ${treasure}`);

        timer = setTimeout(() => {
            treasureCaught = false;
        }, 1000)
    }

    if (Settings.flexboneOpenAH && treasure === "a Flexbone") {
        ChatLib.command("ahs Flexbone")
    }
}).setCriteria("⛃ ${rarity} CATCH! You caught ${treasure}!");

register("renderOverlay", () => {
    if (Settings.treasureNotifEnabled && treasureCaught) {
        notifictionText.draw();
        notifictionText.setX((Settings.treasureNotifX / 2) - (notifictionText.getWidth() / 4));
        notifictionText.setY((Settings.treasureNotifY / 2) - (notifictionText.getHeight() / 4));
    }
})

function pressAndReleaseSequence(numberOfPresses, delayBetweenPresses) {
    let count = 0;
  
    function doPressAndRelease() {
      if (count < numberOfPresses) {
        useItemBind.setState(true); // Press
        setTimeout(() => {
          useItemBind.setState(false); // Release after delay
          count++;
          // Optional: Add a small delay between press/release cycles if needed
          setTimeout(doPressAndRelease, 50); 
          //doPressAndRelease(); // Start the next cycle
        }, delayBetweenPresses);
      }
    }
  
    doPressAndRelease(); // Start the sequence
  }

// Random number generator functions
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function smoothRotatePlayer(totalYawChange, totalPitchChange, durationMs) {
    const steps = 20; // Number of small increments
    const stepDelay = durationMs / steps; // Time between each step
    
    const yawPerStep = totalYawChange / steps;
    const pitchPerStep = totalPitchChange / steps;
    
    let currentStep = 0;
    
    function applyNextStep() {
        if (currentStep < steps) {
            // Get current rotation
            const currentYaw = Player.getYaw();
            const currentPitch = Player.getPitch();
            
            // Apply small increment
            Player.getPlayer().setAngles(
                currentYaw + yawPerStep, 
                currentPitch + pitchPerStep
            );
            
            currentStep++;
            
            // Schedule next step
            setTimeout(applyNextStep, stepDelay);
        }
    }
    
    applyNextStep(); // Start the smooth rotation
}

function reset() {
    detected = false;
    caught = false;
    count = 0;
    targetCount = Math.floor(rand(1, Settings.maxFish));
}
