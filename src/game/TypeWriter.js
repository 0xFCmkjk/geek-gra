export function typewriteText(scene, text, targetTextObject) {
    const length = text.length;
    
    // Stop any ongoing typing effect
    if (targetTextObject.isTyping) {
        scene.time.removeEvent(targetTextObject.typingEvent);
        targetTextObject.isTyping = false;
        return;
    }

    if (!targetTextObject.isTyping) {
        targetTextObject.isTyping = true;
        targetTextObject.text = ""; 

        let i = 0;
        targetTextObject.typingEvent = scene.time.addEvent({
            callback: () => {
                if (text[i] !== "~") {
                    targetTextObject.text += text[i];
                    ++i;
                    if (i === length) {
                        targetTextObject.isTyping = false; // Mark typing as finished inside the callback function
                    }
                } else {
                    targetTextObject.text = "";
                    ++i;
                }
            },
            repeat: length - 1,
            delay: 75
        });
    }
}