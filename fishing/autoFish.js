import smoothRotatePlayer from "../helpers/smoothRotatePlayer";
import pressAndReleaseSequence from "../helpers/pressAndRelease";
import rand from "../helpers/rand";

import Settings from "../config"

const EntityArmorStandClass = Java.type('net.minecraft.entity.decoration.ArmorStandEntity').class;

let detected = false;
let caught = false;
let count = 0;
let targetCount = Math.floor(rand(1, Settings.maxFish));
let guiOpen = false;

function reset() {
    detected = false;
    caught = false;
    count = 0;
    targetCount = Math.floor(rand(1, Settings.maxFish));
}

function registerAutoFish() {
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
}

export default registerAutoFish;
