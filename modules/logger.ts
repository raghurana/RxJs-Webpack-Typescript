

export class Logger {
    static log(message) {
        var textArea: HTMLTextAreaElement = document.getElementById("console-log") as HTMLTextAreaElement;
        textArea.value += message + String.fromCharCode(13, 10);
        console.log(message);
    }
}