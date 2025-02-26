export function disableNarrator(scene){
    if (scene.narrator.typingEvent) {
        scene.time.removeEvent(scene.narrator.typingEvent); // Stop typewriter event
    }
    
    scene.narrator.text = "";
    scene.narrator.isTyping = false;
    scene.ziom.setVisible(false);
    scene.resumeButton.setVisible(false);
}