const Menu = new (function() {
//-----BEGIN GLOBAL SETTINGS-----//
    
    let MENU_ROW = [280, 280, 290, 300, 290];
    let menuColumnPos = [200, 250, 300, 350, 400];

    let wobble = 10;
    let wobbleSpeed = 0.15;
    this.cursor1 = 0;
    let currentPage = 0;

    let classListMenu = ["New Game", "Load / Save", "Settings", "Help" , "Credits"];
    let classListLoad = ["Load Game", "Save Game", "Select Chapter", "Back"];
    let classListLevels = ["Chapter 1", "Chapter 2", "Chapter 3", "Back"];
    let classListSettings = ["Volume", "Controls", "Back"];
    let classListHelp= ["How to play","Control layout","Back"];
    let classListCredits= ['Jaime Rivas' , "Back"];


    const MENU_PAGE = 0;
    const GAME_PAGE = 1;
    const SETTINGS_PAGE = 2;
    const HELP_PAGE = 3;
    const CREDITS_PAGE = 4;
    

    let menuPageText = [classListMenu, classListLoad, classListSettings, classListHelp, classListCredits, classListLevels];
    let textColour = "#008b8b";
    let textFontFace = "22px Book Antiqua";

//-----END GLOBAL SETTINGS-----//

this.update = function(){
       if (this.cursor1 < 0){
            this.cursor1 = menuPageText[currentPage].length - 1;
        }

        if (this.cursor1 >= menuPageText[currentPage].length){
            this.cursor1 = 0;
        }
}


this.checkState = function(){
    if (menuPageText[currentPage][this.cursor1] === "New Game"){
        gameIsStarted = true;
    }
    if (menuPageText[currentPage][this.cursor1] === "Load / Save"){
        this.cursor1 = 0;
        currentPage = GAME_PAGE;
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
    //canvasContext.drawImage(logoPic, 0, 0);
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

    for (let i=0; i<menuPageText[currentPage].length; i++){
     drawText(menuPageText[currentPage][i],MENU_ROW[i], menuColumnPos[i],textColour, textFontFace, 'left', 'middle'); 
    }
    
        //Display previous score
    //drawText("Score: ",MENU_ROW[0], menuColumnPos[4],textColour, textFontFace, 'left', 'middle' );
        
        //Draw cursor
    canvasContext.drawImage(arrowPic,MENU_ROW[0] -45 + wobble*2,menuColumnPos[this.cursor1] - 15);
 }



})(); 