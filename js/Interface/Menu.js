const Menu = new (function() {
    let wobble = 10;
    let wobbleSpeed = .25;
    this.cursor1 = -1;
 
    const MENU_PAGE = 0;
    const RESUME_PAGE = 1;
    const SETTINGS_PAGE = 2;
    const HELP_PAGE = 3;
    const CREDITS_PAGE = 4;
    const CHAPTER_PAGE = 5;

    let itemsX = 340;
    let topItemY = 210;
    let itemsWidth = 300;
    let rowHeight = 45;

    let currentPage = 0;

    let textFontFace = "22px Book Antiqua";
    let textColour = "teal" ;

    let classListMenu = ["new game", "resume", "settings", "tutorials" , "credits"];
    let classListLoad = ["load game", "start chapter", "back"];
    let classListLevels = ["chapter 1", "chapter 2", "chapter 3", "back"];
    let classListSettings = ["volume", "controls", "back"];
    let classListHelp= ["game guide","gamepad layout","back"];
    let classListCredits= ['Jaime Rivas' , "back"];

    let menuPageText = [classListMenu, classListLoad, classListSettings, classListHelp, classListCredits, classListLevels];

this.update = function(){
       if (this.cursor1 < 0){
            this.cursor1 = menuPageText[currentPage].length - 1;
        }

        if (this.cursor1 >= menuPageText[currentPage].length){
            this.cursor1 = 0;
        }

    let menuItemWidth = 80; // enough pixels for the longest word in the menu list
    let menuItemHeight = 12; // approximate height, intentionally leaves some gap between
  for (let i = 0; i < menuPageText[currentPage].length; i++) {
    if(mouseX > (topItemY + rowHeight) * i && mouseX < (topItemY + rowHeight * i)+menuItemWidth && 
       mouseY > itemsX && mouseY < itemsX+menuItemHeight) {
      this.cursor1 = i;
    }
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
    this.redraw();

    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

    if(currentPage == CREDITS_PAGE) {
      drawRect( 0, 0, gameCanvas.width, gameCanvas.height, "cyan", 0.2);
      let creditsX = 11;
      let creditsTopY = 25;
      let creditsLineSkipY = 55;
      for (let i = 0; i < creditsList.length; i++) {
        drawText(creditsList[i],creditsX, creditsTopY + creditsLineSkipY * i, textColour, textFontFace, 'left', 'top');
      }    
    } else {
    //canvasContext.drawImage(logoPic, 0, 0);
          //Draw cursor
    canvasContext.drawImage(arrowPic,itemsX -wobble ,topItemY + (this.cursor1 * rowHeight) -12);

    for (let i=0; i<menuPageText[currentPage].length; i++){
     drawText(menuPageText[currentPage][i], itemsX,topItemY + rowHeight * i,textColour, textFontFace, 'left', 'top');
    }   
  }
}
   
})(); 