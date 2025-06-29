import Settings from "../config"

const notifictionText = new Text("").setScale(2).setShadow(true);
let treasureCaught = false;

function registerTreasureDisplay() {
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

            notifictionText.setString(`${rcc}${rarity}&r: ${treasure}`);

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
}

export default registerTreasureDisplay;
