import registerAutoFish from "./autoFish";
import registerTreasureDisplay from "./treasureDisplay"

class FishingManager {

    init() {
        registerTreasureDisplay();
        registerAutoFish();
    }
}


export default new FishingManager();
