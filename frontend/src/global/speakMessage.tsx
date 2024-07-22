 export const speakError = (message: string) => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utterThis = new SpeechSynthesisUtterance(message);
            synth.speak(utterThis);
        } else {
            console.error('Text-to-speech is not supported in this browser.');
        }
    };