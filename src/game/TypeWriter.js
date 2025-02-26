import { EventBus } from "./EventBus";
export function typewriteText(scene, text, targetTextObject, narratorObject) {
    // Remove any previous listeners to avoid duplicates
    EventBus.off("resume-typing");  
    EventBus.off("show-resume-button");

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
                    if (text[i] == "~") {
                        EventBus.emit("show-resume-button"); // Correctly trigger the resume button
                        scene.time.removeEvent(targetTextObject.typingEvent);
                        return;
                    } 
                    
                    targetTextObject.text += text[i];
                    i++;

                    if (i == length) {
                        targetTextObject.isTyping = false; 
                    }
                }
            },
            repeat: length - i - 1,
            delay: 50
        });
    }

    // Re-add event listener for showing the button
    EventBus.on("show-resume-button", () => {
        scene.resumeButton.setVisible(true); // Make sure the button appears
    });

    EventBus.on("resume-typing", () => {
        if (i == length - 1) {
            narratorObject.setVisible(false);
            targetTextObject.text = "";
            targetTextObject.isTyping = false;
            scene.time.removeEvent(targetTextObject.typingEvent);
            EventBus.emit('end-of-text');
        }
        else {
            i++;
            targetTextObject.text = "";
            resumeTyping();
        }
    });

    resumeTyping();
}