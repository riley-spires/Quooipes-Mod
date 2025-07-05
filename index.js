import Settings from "./config"

import FishingManager from "./fishing/FishingManager";
import Melody from "./melody/AutoMelody";
import visualManager from "./visual/visualManager";

FishingManager.init();
Melody.init();
visualManager.init();

register("command", () => Settings.openGUI()).setName("quoopiesmod").setAliases(["qm"]);
