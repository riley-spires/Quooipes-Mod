import Settings from "./config"

import FishingManager from "./fishing/FishingManager";
import Melody from "./melody/AutoMelody";

FishingManager.init();
Melody.init();

register("command", () => Settings.openGUI()).setName("quoopiesmod").setAliases(["qm"]);

