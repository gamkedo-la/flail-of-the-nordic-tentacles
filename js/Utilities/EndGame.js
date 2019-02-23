// a simple game over text scroller when you defeat the final boss

function TriggerEndGame() {
    console.log("END GAME TRIGGERED!");

    // start a text scroller with endgame text
    TextScroll.init({
        text:
        [
            "With one final heroic attack,",
            "you defeat the demonic boss.",
            "",
            "A burst of magical energy cracks",
            "open the sky, and all remaining",
            "dark magic is pulled into a vortex",
            "of swirling starlight.",
            "",
            "Peace has returned to the North.",
            "",
            "You are a hero. Game Over."
        ]});

        // go back to the main menu after 25 seconds
        setTimeout('location.reload()',25000);

}