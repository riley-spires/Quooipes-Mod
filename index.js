import Settings from "./config"

import FishingManager from "./fishing/FishingManager";

FishingManager.init();

register("command", () => Settings.openGUI()).setName("quoopiesmod").setAliases(["qm"]);

