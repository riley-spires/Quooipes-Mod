import Settings from "../config"

class AutoMelody {
    melodyOpen = false;
    lastInv = 0;


    init() {
        register("guiOpened", (screen, event) => {
            if (!Settings.melodyEnabled) return;
            this.melodyOpen = false;

            let guiName = screen.getTitle();
            if (guiName !== null) {
                if (guiName.getString().startsWith("Harp")) {
                    this.melodyOpen = true;
                }
            }
        });

        register("guiRender", (x, y, screen) => {
            if (!Settings.melodyEnabled) return;
            if (!this.melodyOpen) return;

            let container = Player.getContainer();
            let newHash = this.generateHash(container.getItems().map(it => {
                if (it === null) return ""

                return it.getName() || ""
            }).join(""))


            if (newHash === this.lastInv) return;

            this.lastInv = newHash;

            for (let i = 0; i <= 6; ++i) {
                let slot = container.getItems()[37 + i];

                if (slot === null) continue;

                if (slot.getMcValue().getRegistryEntry().getIdAsString() === "minecraft:quartz_block") {
                    container.click(37 + i)
                }
            }
        });
    }

    generateHash(string) {
        let hash = 0;
        for (const char of string) {
            hash = (hash << 5) - hash + char.charCodeAt(0);
            hash |= 0; 
        }
        return hash;
    };
};



export default new AutoMelody();
