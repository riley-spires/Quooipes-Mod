import renderBox from "../helpers/renderBox"
import Settings from "../config"

class GlowingMushroomHighlight {
    mushroomIds = ["minecraft:red_mushroom", "minecraft:brown_mushroom"];
    blocksToRender = new Set();

    init() {
        register("postRenderWorld", (partialTicks) => {
            if (!Settings.glowingMushroomHighlightEnabled) return;

            for (const coord of this.blocksToRender.values()) {
                renderBox(Renderer.GREEN, coord.x, coord.y, coord.z, 5);
            }
        });

        register("spawnParticle", (particle, event) => {
            if (!Settings.glowingMushroomHighlightEnabled) return;
            if (particle.toMC().getType().name() !== "PARTICLE_SHEET_TRANSLUCENT") return;

            let x = Math.floor(particle.getX());
            let y = Math.floor(particle.getY());
            let z = Math.floor(particle.getZ());

            let coord = {
                "x": x,
                "y": y,
                "z": z
            }

            let id = World.getBlockAt(x, y, z).getType().getRegistryName();

            if (!this.mushroomIds.includes(id)) return;

            if (!this.blocksToRender.has(coord)) {
                this.blocksToRender.add(coord);
            }
        });
    }
}

export default new GlowingMushroomHighlight();
