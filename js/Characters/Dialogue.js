function Dialogue() {
    this.isShowing = false;
    this.letterCounter = 0;
    this.page = 0;
    this.talkedTo = false;

    var letterSpeed = 1;

    var boxPic = textboxPic;
    var boxX = 58;
    var boxY = 430;

    var textX = boxX + 35;
    var textY = boxY + 45;
    this.create = function (dialogueList) {
        if (this.isShowing) {
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
        if (this.isShowing) {
            var textSpeltOut = this.letterCounter >= dialogueList[this.page].length;
            if (this.letterCounter < dialogueList[this.page].length) {
                this.letterCounter = dialogueList[this.page].length
            } else if (textSpeltOut && this.page < dialogueList.length - 1) {
                this.page++;
                this.letterCounter = 0;
            } else if (textSpeltOut && this.page >= dialogueList.length - 1) {
                this.isShowing = false;
                this.page = 0;
                this.letterCounter = 0;
                this.talkedTo = true; //finished talking to npc
            }
        }
    }
}

var maleVikingDialogue = new Dialogue();
var maleVikingText = ["Viking 1: Hello, I'm a viking.", "The male kind.", "Har har har!"];

var femaleVikingDialogue = new Dialogue();
var femaleVikingText = ["Viking 2: Hello, I'm a viking.", "The female kind.", "Ohohoho!"];

var outcastDialogue = new Dialogue();
var outcaseText = ["Outcast: I'm sad...", "Why, you ask?", "It seems no one likes me...", "I feel like it has something to do with my name."];

var seerDialogue = new Dialogue();
var seerText = ["Seer: I've been expecting you.", "How? I saw you walk up to me!"];

function triggerText(npcTextBool) {
    //if an npc hasn't been talked to yet, then play their event
    if (!npcTextBool.talkedTo) npcTextBool.isShowing = true;
}

var allNpcEvents = [maleVikingDialogue, femaleVikingDialogue, outcastDialogue, seerDialogue];
var allNpcText = [maleVikingText, femaleVikingText, outcaseText, seerText];

function dialogueNotShowing() {
    return !maleVikingDialogue.isShowing && !femaleVikingDialogue.isShowing && !outcastDialogue.isShowing && !seerDialogue.isShowing;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//TO-DO refactor

function createDialogue() {
    for (var i = 0; i < allNpcEvents.length; i++) {
        allNpcEvents[i].create(allNpcText[i]);
    }
}

function nextDialoguePage() {
    for (var i = 0; i < allNpcEvents.length; i++) {
        allNpcEvents[i].nextPage(allNpcText[i]);
    }
}

function resetDialogue() {
    for (var i = 0; i < allNpcEvents.length; i++) {
        allNpcEvents[i].talkedTo = false; //reset here, to talk to npcs again
    }
}
