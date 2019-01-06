const Menu = new (function() {
//-----BEGIN GLOBAL SETTINGS-----//
    
    let MENU_ROW = [340, 330, 340, 333];
    let menuColumnPos = [250, 300, 350, 400];

    let wobble = 10;
    let wobbleSpeed = 0.25;
    this.cursor1 = 0;
    let currentPage = 0;
    let keyRepeatWait = 0;

    let classListMenu = ["Play", "Settings", "Help" , "Credits"];
    let classListGame = ["New Game", "Continue", "Select Chapter", "Back"];
    let classListLevels = ["Chapter 1", "Chapter 2", "Chapter 3", "Back"];
    let classListSettings = ["Volume", "Controls", "Back"];
    let classListHelp= ["How to play","Control layout","Back"];
    let classListCredits= ['Jaime Rivas' , "Back"];


    const MENU_PAGE = 0;
    const SETTINGS_PAGE = 1;
    const HELP_PAGE = 2;
    const CREDITS_PAGE = 3;
    const LEVELS_PAGE = 4;

    let menuPageText = [classListMenu, classListSettings, classListHelp, classListCredits, classListLevels];
    let textColour = "#008b8b" ;
    let textFontFace = "20px Arial";

// A super-janky menu input key repeat delay variable
    const KEY_REPEAT_FRAME_DELAY = 10;
//-----END GLOBAL SETTINGS-----//

this.update = function(){
     keyRepeatWait = Math.max(0, keyRepeatWait - 1);
       if (this.cursor1 < 0){
            this.cursor1 = menuPageText[currentPage].length - 1;
        }

        if (this.cursor1 >= menuPageText[currentPage].length){
            this.cursor1 = 0;
        }
}


this.checkState = function(){
    if (menuPageText[currentPage][this.cursor1] === "Play"){
        gameIsStarted = true;
    }  
    if (menuPageText[currentPage][this.cursor1] === "Settings"){
        this.cursor1 = 0;
        currentPage = SETTINGS_PAGE; 
    } 
    if (menuPageText[currentPage][this.cursor1] === "Help"){
        this.cursor1 = 0;
        currentPage  = HELP_PAGE;
    } 
    if (menuPageText[currentPage][this.cursor1] === "Credits"){
        this.cursor1 = 0;
        currentPage  = CREDITS_PAGE;    
    } 

    if (menuPageText[currentPage][this.cursor1] === "Volume"){
        console.log("TODO implement volume change");   
    } 
    if (menuPageText[currentPage][this.cursor1] === "Controls"){ 
        console.log("TODO Added Controls change"); 
    } 
    if (menuPageText[currentPage][this.cursor1] === "Back"){
        currentPage  = MENU_PAGE;
    }    

    if (menuPageText[currentPage][this.cursor1] === "How to play"){ 
        //Handle help screen differently;
    }  
    if (menuPageText[currentPage][this.cursor1] === "Control layout"){
        //Handle Control layout screen differently;
    }

    if (this.cursor1 >= menuPageText[currentPage].length){//if we're going to shorter menu
        this.cursor1 = menuPageText[currentPage].length - 1;
    }
}

this.redraw = function (){
            // Clear the screen
    // Note: according to the internet, this approach is faster than using
    // fillRect() or drawImage()
    // see, e.g., https://dzone.com/articles/how-you-clear-your-html5
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore(); 
}

this.draw = function() {
    this.redraw();
        // Draw the menu logo
    //canvasContext.drawImage(logoPic, 0, 0);

    for (let i=0; i<menuPageText[currentPage].length; i++){
     drawText(menuPageText[currentPage][i],MENU_ROW[i], menuColumnPos[i],textColour, textFontFace, 'left', 'middle'); 
    }
    
     //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
        wobble += wobbleSpeed;
        //Display previous score only if  player has lost
    //drawText("Score: ",MENU_ROW[0], menuColumnPos[4],textColour, textFontFace, 'left', 'middle' );
        
        //Draw cursor
    canvasContext.drawImage(arrowPic,MENU_ROW[0] -50 ,menuColumnPos[this.cursor1] - wobble - 8);
 }



})(); 