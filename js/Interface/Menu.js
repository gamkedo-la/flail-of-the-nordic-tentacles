let saveConfirmed = "";
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

    let itemsX = 310;
    let topItemY = 390;
    let itemsWidth = 650;
    let rowHeight = 35;

    let currentPage = 0;

    let textFontFace = "18px viking-normalregular";
    let textFontFaceCredits = "8.5px viking-normalregular";
    let textColour = "white" ;

    let classListMenu = ["new*game", "load game", /*"settings",*/ "tutorial" , "credits"];
    let classListLoad = ["resume", "select chapter", "back"];
    let classListLevels = ["chapter 1", "chapter 2", "chapter 3", "back"];
    let classListSettings = ["volume", "controls", "back"];
    let classListHelp= ["gameplay","gamepad","back"];
    let classListPaused= ['save' , /*'audio',*/  'unpause'];
    let classListCredits= ["back"];

let creditsText =[
"                                                                Flail of the Nordic Tentacles Team",
"",
"Jaime Rivas: Project lead, core gameplay, slime enemy, level editor, map switching, terrain tilesheet integration,",
"   stats implementation, bug fixes, xp rewards and leveling up, collision handling, snow art (bush, tree, pit,",
"   rebel tent), forest art (portal), inventory, depth sorting, spawn code, main enemy code, level design, save/load",
"Ryan Malm: Tileset workflow, forest tiles, Wormex sprites, editor improvements, snowygrass tile variations, tall",
"   tile support, ice and snow dunes tiles, inventory fix, animation manager, internal documentation",
"Gonzalo Delgado: Boss character sprite, fight particle effect, randomized enemy start direction",
"Vince McKeown: Main sound code, interface fixes, editor improvements, in-game UI for map name and item pickup,",
"   mute, Seer and NPC placement, cheat test features, boundary testing, Wormex implementation, randomized hit",
"   audio integration",
"Christer \"McFunkypants\" Kaitila: terrain spritesheet, gamepad support, character code cleanup, footprints trail",
"   feature, fading title on transitions, particles (dust, death, action, sparkles), stats interface art, enemy",
"   attack range, ending",
"Vaan Hope Khani: Main character sprite, xp display, in-game and main menu, additional player stats",
"Shaun Lindsley: Sounds (enemy hits/attack/defeated, level up, gravel/grass/forest/snow/ice footsteps, item pickup,",
"   menu sounds, NPC sounds, scene change)",
"Terrence McDonnell: Road tiles art, player movement fix, projectile improvements, chase AI",
"Simon J Hoffiz: Pause functionality, main menu music, player and enemy recoil from combat loss",
"Trolzie: Health and XP bars, enemy health bars, eyepatch implementation, Outcast character, stats UI, scrolling",
"   intro text",
"Visyama Menon: Fallen Viking, Alien Tank, and Alien Infantry art",
"Asix Jin: 3 songs (Rebel Woods, Nordic Snow, Nordic Rage)",
"Stebs: Logo art and integration, music integration",
"Kise: Dialog feature",
"Chris Markle: Player hit and player attack sounds",
"Rémy Lapointe: Snowy grass tile",
"Matt Sullivan: Enemy AI debug visualization",
"Nicholas Polchies: W/S key support for menu",
"Michelly Oliveira: Removal of sprite animation debug behavior",
"Chris DeLeon: Title background image, game credits",
"",
"                      Made by collaborators worldwide in Gamkedo Club - join or find out more at gamkedo.com",
"",
"                                                                        CLICK ANYWHERE TO RETURN"
];

    let gameplayList = ["                                                       Basic Gameplay:",
                        "                           Moving into enemies will either damage them or",
                        "                           you depending on each character's cardinal facing",
                        "                                                           Controls:", 
                        "                           Movement: WASD OR Up/Down/Right/Left Arrows", 
                        "                           P: pause/resume", 
                        "                           Enter/Space: Select/Progress Dialogue", 
                        "                           I: Show/Hide Inventory",
                        "                                                           Items:",
                        "                                               *Must first be found*",
                        "                           Tentacle: Briefly stops enemy movement with \" E \"",
                        "                           Portal: Briefly gain immunity with \" F \"",
                        "                           Horn: Regain all health with \" R \"",
                        "                           Eye Patch: Displays enemy health",];

    let menuPageText = [classListMenu, classListLoad, classListSettings, gameplayList, classListCredits, classListLevels, classListPaused];

this.menuMouse = function(){
     for (let i = 0; i < menuPageText[currentPage].length; i++) {
        if(mouseX > itemsX && mouseX < itemsX + itemsWidth
            && mouseY > topItemY + (i * rowHeight)-20 && mouseY < topItemY + (i+1) * rowHeight-20) {
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

        this.draw();
    }



this.checkState = function(){
     switch (menuPageText[currentPage][this.cursor1]) {

    //MENU PAGE
    case "new*game":
        gameIsStarted = true;
        this.cursor1 = 0;
        TextScroll.init({});
        handleBackgroundMusic();
        break;
    case "load game":
        /*currentPage = RESUME_PAGE;*/ // no chapter select functionality, so doesn't need to a menu layer :)
        loadGame();
        this.cursor1 = 0;
        break;
    case "settings":
        this.cursor1 = 0;
        currentPage = SETTINGS_PAGE;
        break;
    case "tutorial":
        this.cursor1 = 0;
        currentPage  = HELP_PAGE;
        break;
    case "credits":
        this.cursor1 = 0;
        currentPage  = CREDITS_PAGE;
        break;

    //RESUME PAGE        
    case 'resume':
        loadGame();
        this.cursor1 = 0;
        break;

    //SETTINGS PAGE
    case "volume":
        console.log("TODO implement volume changer");
        break;
    case "controls":
        console.log("TODO Added Controls changer");
        break;

    //TUTORIALS PAGE
    case "gameplay":
        console.log("TODO implement how to play");
        break;
    case "back":
        currentPage  = MENU_PAGE;
        this.cursor1 = 0;
        break;

    //PAUSED PAGE
    case 'unpause':
        isPaused = false;
        this.cursor1 = 0;
        break;
    case 'audio':
        muteSFXandBackground();
        this.cursor1 = 0;
        break;
    case 'save':
        saveGame();
        saveConfirmed = " (done!)";
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

this.draw = function() 
{
    if(gameIsStarted === false)
    {
        if(currentPage == PAUSED_PAGE)
        {
          currentPage = MENU_PAGE;
        }

        this.redraw();
        /*let pattern = canvasContext.createPattern(snowyTile, "repeat");
        canvasContext.rect(0,0, 775,800);
        canvasContext.fillStyle = pattern;
        canvasContext.fill();*/
        canvasContext.drawImage(titlePic, 0,0);
        if(currentPage != CREDITS_PAGE && currentPage != HELP_PAGE) {
            canvasContext.drawImage(logoPic, canvas.width/2-160,30, 300,300);
        }
    }
    else if(isPaused) 
    {
        currentPage = PAUSED_PAGE;
        canvasContext.fillStyle = "#292929";
        canvasContext.fillRect(itemsX -104,topItemY - 44,
        308, rowHeight * menuPageText[currentPage].length + rowHeight + 8);

        canvasContext.fillStyle = "#70130F";
        canvasContext.fillRect(itemsX -100,topItemY - 40,
        300, rowHeight * menuPageText[currentPage].length + rowHeight);

        canvasContext.fillStyle = "#292929";
        canvasContext.fillRect(itemsX - 89,topItemY - 29,
        279, rowHeight * menuPageText[currentPage].length + rowHeight - 20);

        canvasContext.beginPath();              
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "white";

        canvasContext.moveTo(itemsX - 90, topItemY - 30);
        canvasContext.lineTo(itemsX - 90, topItemY + 60);

        canvasContext.moveTo(itemsX - 90, topItemY + 60);
        canvasContext.lineTo(itemsX - 90 + 280, topItemY + 60);

        canvasContext.moveTo(itemsX - 90 + 280, topItemY + 60);
        canvasContext.lineTo(itemsX - 90 + 280, topItemY - 30);

        canvasContext.moveTo(itemsX - 90 + 280, topItemY - 30);
        canvasContext.lineTo(itemsX - 90, topItemY - 30);

        canvasContext.stroke();

        drawText(saveConfirmed,itemsX+70, topItemY-5, "yellow", textFontFaceCredits, 'left', 'top');

    }
    else {return;}

    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

    if(currentPage == CREDITS_PAGE || currentPage == HELP_PAGE)
    {
        canvasContext.fillStyle = "black";
        canvasContext.globalAlpha = 0.5; 
        canvasContext.fillRect( 0, 0, canvas.width, canvas.height);
        canvasContext.globalAlpha = 1.0; 
    }

    if(currentPage == CREDITS_PAGE) 
    {
      let creditsX = 11;
      let creditsTopY = 17;
      let creditsLineSkipY = 18;

      for (let i = 0; i < creditsText.length; i++) 
      {
        creditsTopY += creditsLineSkipY + (creditsText[i].substring(0, 3) == "   " ? -4 : 0);
        drawText(creditsText[i],creditsX, creditsTopY, textColour, textFontFaceCredits, 'left', 'top');
      }
    } else {

        for (let i=0; i<menuPageText[currentPage].length; i++)
        {
            drawText(menuPageText[currentPage][i],itemsX - (currentPage == HELP_PAGE ? 275 : 0),topItemY + rowHeight * i - (currentPage == HELP_PAGE ? 325 : 0),
                    (currentPage == HELP_PAGE ? "yellow" : textColour), (currentPage == HELP_PAGE ? "11px viking-normalregular" : textFontFace), 'left', 'top');
            //Draw cursor
            if(currentPage != HELP_PAGE)
                canvasContext.drawImage(arrowPic,(itemsX-20) - wobble * i,topItemY + (this.cursor1 * rowHeight) -14);
        }
    }
}

})();
