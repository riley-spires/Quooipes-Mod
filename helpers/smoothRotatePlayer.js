function smoothRotatePlayer(totalYawChange, totalPitchChange, durationMs) {
    const steps = 20; // Number of small increments
    const stepDelay = durationMs / steps; // Time between each step
    
    const yawPerStep = totalYawChange / steps;
    const pitchPerStep = totalPitchChange / steps;
    
    let currentStep = 0;
    
    function applyNextStep() {
        if (currentStep < steps) {
            // Get current rotation
            const currentYaw = Player.getYaw();
            const currentPitch = Player.getPitch();
            
            // Apply small increment
            Player.getPlayer().setAngles(
                currentYaw + yawPerStep, 
                currentPitch + pitchPerStep
            );
            
            currentStep++;
            
            // Schedule next step
            setTimeout(applyNextStep, stepDelay);
        }
    }
    
    applyNextStep(); // Start the smooth rotation
}

export default smoothRotatePlayer;
