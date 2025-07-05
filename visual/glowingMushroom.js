import renderBox from "../helpers/renderBox"
import Settings from "../config"

class GlowingMushroomHighlight {
    mushroomIds = ["minecraft:red_mushroom", "minecraft:brown_mushroom"];
    blocksToRender = new Set();

    init() {
        register("postRenderWorld", (partialTicks) => {
            if (!Settings.glowingMushroomHighlightEnabled) return;

            for (const coordStr of this.blocksToRender.values()) {
                let [x, y, z] = JSON.parse(coordStr);
                renderBox(Renderer.GREEN, x, y, z, 5);
            }
        });

        register("spawnParticle", (particle, event) => {
            if (!Settings.glowingMushroomHighlightEnabled) return;
            if (particle.toMC().getType().name() !== "PARTICLE_SHEET_TRANSLUCENT") return;

            let x = Math.floor(particle.getX());
            let y = Math.floor(particle.getY());
            let z = Math.floor(particle.getZ());

            let id = World.getBlockAt(x, y, z).getType().getRegistryName();

            let coordStr = JSON.stringify([x, y, z]);

            if (!this.mushroomIds.includes(id)) return;

            if (!this.blocksToRender.has(coordStr)) {
                this.blocksToRender.add(coordStr);
            }
        });

        register("tick", () => {
            for (const coordStr of this.blocksToRender.values()) {
                let [x, y, z] = JSON.parse(coordStr);

                let block =  World.getBlockAt(x, y, z);

                if (!this.mushroomIds.includes(block.getType().getRegistryName())) {
                    this.blocksToRender.delete(coordStr);
                }
            }
        });
    }

}

export default new GlowingMushroomHighlight();
