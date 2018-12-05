function Dialogue() {
    this.isPlaying = false;
    this.letterCounter = 0;
    this.page = 0;

    var letterSpeed = 1;

    var boxPic = textboxPic;
    var boxX = 58;
    var boxY = 430;

    var textX = boxX + 50;
    var textY = boxY + 45;

    this.create = function (dialogueList) {
        if (this.isPlaying) {
            var spellout;
            this.showBox();
            if (this.letterCounter < dialogueList[this.page].length) {
                this.letterCounter += letterSpeed;
            }
            spellout = dialogueList[this.page].substr(0, this.letterCounter)
            drawText(spellout, textX, textY, "white", "20px Arial");
        }
    }

    this.showBox = function () {
        canvasContext.drawImage(boxPic, boxX, boxY);
    }

    this.nextPage = function (dialogueList) {
        if (this.isPlaying) {
            var textSpeltOut = this.letterCounter >= dialogueList[this.page].length;
            if (this.letterCounter < dialogueList[this.page].length) {
                this.letterCounter = dialogueList[this.page].length
            } else if (textSpeltOut && this.page < dialogueList.length - 1) {
                this.page++;
                this.letterCounter = 0;
            } else if (textSpeltOut && this.page >= dialogueList.length - 1) {
                this.isPlaying = false;
                this.page = 0;
                this.letterCounter = 0;
            }
        }
    }
}

var testDialogue = new Dialogue();
var testChat = ["This is a test", "A really long sentence to remind me that I have to get wrap working", "Hello hello hello"];



function createDialogue() {
    testDialogue.create(testChat);
}

function nextDialoguePage() {
    testDialogue.nextPage(testChat)
}










