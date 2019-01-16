const Menu = new (function() {
    let wobble = 12;
    let wobbleSpeed = .25;
    this.cursor1 = 0;
 
    const MENU_PAGE = 0;
    const RESUME_PAGE = 1;
    const SETTINGS_PAGE = 2;
    const HELP_PAGE = 3;
    const CREDITS_PAGE = 4;
    const CHAPTER_PAGE = 5;
     const PAUSED_PAGE = 6;

    let itemsX = 340;
    let topItemY = 210;
    let itemsWidth = 300;
    let rowHeight = 45;

    let currentPage = 0;

    let textFontFace = "26px Book Antiqua";
    let textColour = "teal" ;

    let classListMenu = ["new game", "resume", "settings", "tutorials" , "credits"];
    let classListLoad = ["load game", "start chapter", "back"];
    let classListLevels = ["chapter 1", "chapter 2", "chapter 3", "back"];
    let classListSettings = ["volume", "controls", "back"];
    let classListHelp= ["gameplay guide","gamepad guide","back"];
    let classListCredits= ['Jaime Rivas' , "back"];
    let classListPaused= ['save' , 'audio',  'return'];

    let menuPageText = [classListMenu, classListLoad, classListSettings, classListHelp, classListCredits, classListLevels, classListPaused];
this.menuMouse = function(){
     for (let i = 0; i < menuPageText[currentPage].length; i++) {
        if(mouseX > itemsX && mouseX < itemsX + itemsWidth 
            && mouseY > topItemY + (i * rowHeight) && mouseY < topItemY + (i+1) * rowHeight) {
            this.cursor1 = i;
        }
    }
}
this.update = function(){
   
       if (this.cursor1 < 0){
            this.cursor1 = menuPageText[currentPage].length - 1;
        }

        if (this.cursor1 >= menuPageText[currentPage].length){
            this.cursor1 = 0;
        }
    }



this.checkState = function(){
     switch (menuPageText[currentPage][this.cursor1]) {
    case "new game":
        gameIsStarted = true;
        this.cursor1 = 0;
        break;
    case "resume":
        currentPage = RESUME_PAGE;
        this.cursor1 = 0;
        break;
    case "settings": 
        this.cursor1 = 0;
        currentPage = SETTINGS_PAGE; 
        break;
    case "tutorials":
        this.cursor1 = 0;
        currentPage  = HELP_PAGE;
        break;
    case "credits":
        this.cursor1 = 0;
        currentPage  = CREDITS_PAGE;    
        break;

    case "volume":
        console.log("TODO implement volume changer");   
        break;
    case "controls":
        console.log("TODO Added Controls changer");   
        break;
    case "game guide":
        console.log("TODO implement how to play");
        break;
    case "gamepad layout":
        console.log("TODO implement control layout");
        break;
    case "back":
        currentPage  = MENU_PAGE; 
        this.cursor1 = 0;
        break;
    default:
        break;
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
    if(gameIsStarted === false){
        if(currentPage == PAUSED_PAGE){
          currentPage = MENU_PAGE;  
        }
        this.redraw();
    }else {
        currentPage = PAUSED_PAGE;
        canvasContext.clearRect(itemsX -50,topItemY - rowHeight,
        itemsWidth, rowHeight * menuPageText[currentPage].length + rowHeight  );
    }

    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

    if(currentPage == CREDITS_PAGE) {
      drawRect( 0, 0, canvasContext.width, canvasContext.height, "cyan", 0.2);
      let creditsX = 11;
      let creditsTopY = 25;
      let creditsLineSkipY = 55;
      for (let i = 0; i < classListCredits.length; i++) {
        drawText(classListCredits[i],creditsX, creditsTopY + creditsLineSkipY * i, textColour, textFontFace, 'left', 'top');
      }    
    } else {
    if (gameIsStarted === false){
    canvasContext.drawImage(logoPic, 300, 80);
    }
          //Draw cursor
    canvasContext.drawImage(arrowPic,itemsX -wobble ,topItemY + (this.cursor1 * rowHeight) -12);

    for (let i=0; i<menuPageText[currentPage].length; i++){
     drawText(menuPageText[currentPage][i], itemsX,topItemY + rowHeight * i,textColour, textFontFace, 'left', 'top');
    }   
  }
}
   
})(); 