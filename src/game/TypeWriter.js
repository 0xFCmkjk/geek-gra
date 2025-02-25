import { EventBus } from './EventBus';

export function typewriteText(scene, text, targetTextObject, narratorObject) {
    const length = text.length;
    
    if (targetTextObject.isTyping) {
        scene.time.removeEvent(targetTextObject.typingEvent);
        targetTextObject.isTyping = false;
    }

    targetTextObject.isTyping = true;
    targetTextObject.text = ""; 
    let i = 0;

    function resumeTyping() {
        targetTextObject.typingEvent = scene.time.addEvent({
            callback: () => {
                if (i < length) {
                    if (text[i] === "~") {
                        EventBus.emit("show-resume-button"); // Notify to show the button
                        scene.time.removeEvent(targetTextObject.typingEvent); // Stop typing
                        return;
                    } 
                    
                    targetTextObject.text += text[i];
                    i++;

                    if (i === length) {
                        targetTextObject.isTyping = false; 
                    }
                }
            },
            repeat: length - i - 1,
            delay: 75
        });
    }

    EventBus.on("resume-typing", () => {
        if (i == length-1) {
            narratorObject.setVisible(false);
            targetTextObject.text = "";
            targetTextObject.isTyping = false;
        }
        i++; // Move past the "~" character
        targetTextObject.text = "";
        resumeTyping();
    });

    resumeTyping();
}
