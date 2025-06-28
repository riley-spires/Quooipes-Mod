import { @Vigilant, @SliderProperty, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance';

const window = Client.getMinecraft().getWindow();

@Vigilant("Quoopie's Mod")
class Settings {
    @SwitchProperty({
        name: "Auto Fish",
        description: "Enables or disables auto fishing",
        category: "Fishing",
        subcategory: "Auto Fishing",
    })
    enabled = true;

    @SwitchProperty({
        name: "Enabled",
        description: "Display text when treasure is caught",
        category: "Fishing",
        subcategory: "Treasure Display",
    })
    treasureNotifEnabled = true;

    @SliderProperty({
        name: "X Position",
        description: "The X Position of the center of the notification text",
        category: "Fishing",
        subcategory: "Treasure Display",
        min: 0,
        max: window.getScaledWidth()
    })
    treasureNotifX = window.getScaledWidth() / 2;

    @SliderProperty({
        name: "Y Position",
        description: "The Y Position of the center of the notification text",
        category: "Fishing",
        subcategory: "Treasure Display",
        min: 0,
        max: window.getScaledHeight()
    })
    treasureNotifY = window.getScaledHeight() / 2;

    @SwitchProperty({
        name: "Flexbone Open AH",
        description: "When you catch a Flexbone, it will auto run '/ahs Flexbone'",
        category: "Fishing"
    })
    flexboneOpenAH = false;

    @SwitchProperty({
        name: "Status Chats",
        description: "Send status updates in chat",
        category: "Fishing",
        subcategory: "Auto Fishing"
    })
    statusUpdatesEnabled = false;

    @SliderProperty({
        name: "Max Fish",
        description: "Max number of fish to catch before moving cursor",
        category: "Fishing",
        subcategory: "Auto Fishing",
        min: 0,
        max: 10
    })
    maxFish = 10;


    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Fishing", "Fishing Module Config")
    }
}

export default new Settings();
