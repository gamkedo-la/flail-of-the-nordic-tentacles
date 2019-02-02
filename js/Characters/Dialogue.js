function Dialogue() {
    this.isShowing = false;
    this.letterCounter = 0;
    this.page = 0;
    this.talkedTo = false;

    var letterSpeed = 1;
    var nameCol = "yellow";

    var boxPic = textboxPic;
    var boxX = 58;
    var boxY = 430;

    var textX = boxX + 35;
    var textY = boxY + 60;
    
    var nameY = boxY + 30;
    
    this.create = function (charName, indNameCols, dialogueList) {
        if (this.isShowing) {
            var spellout;
            this.showBox();
            if (this.letterCounter < dialogueList[this.page].length) {
                this.letterCounter += letterSpeed;
            }
            spellout = dialogueList[this.page].substr(0, this.letterCounter)
            drawText(charName, textX - 15, nameY, nameCol /* indNameCols */, "20px Arial");
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

var outcastDialogue = new Dialogue();
var outcaseText = ["I'm sad...", "Why, you ask?", "It seems no one likes me...", "I feel like it has something to do with my name."];

var seerDialogue = new Dialogue();
var seerText = ["I've been expecting you.", "How? I saw you walk up to me!"];

function triggerText(npcTextBool) {
    //if an npc hasn't been talked to yet, play their event
    if (!npcTextBool.talkedTo) npcTextBool.isShowing = true;
}

function dialogueNotShowing() {
    return !outcastDialogue.isShowing && !seerDialogue.isShowing;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//TO-DO refactor

var allNpcs = [outcast, seer];
var allNpcNameCols = ["green", "purple", "lightblue", "yellow"];
var allNpcEvents = [outcastDialogue, seerDialogue];
var allNpcText = [outcaseText, seerText];

function createDialogue() {
    for (var i = 0; i < allNpcEvents.length; i++) {
        allNpcEvents[i].create(allNpcs[i].charName, allNpcNameCols[i], allNpcText[i]);
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
