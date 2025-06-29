const useItemBind = Client.getKeyBindFromDescription("key.use");

function pressAndReleaseSequence(numberOfPresses, delayBetweenPresses) {
    let count = 0;
  
    function doPressAndRelease() {
      if (count < numberOfPresses) {
        useItemBind.setState(true); // Press
        setTimeout(() => {
          useItemBind.setState(false); // Release after delay
          count++;
          // Optional: Add a small delay between press/release cycles if needed
          setTimeout(doPressAndRelease, 50); 
          //doPressAndRelease(); // Start the next cycle
        }, delayBetweenPresses);
      }
    }
  
    doPressAndRelease(); // Start the sequence
}


export default pressAndReleaseSequence;
