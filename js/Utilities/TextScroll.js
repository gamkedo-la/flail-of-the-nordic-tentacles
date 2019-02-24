const TextScroll = new (function() {

    this.init = function (config) {
        
        // We cant init when a text is still scrolling
        if (textScrolling) {
            return;
        }

        // The following can be overwritten on TextScroll.init();
        this.position          = config.startPos   || 520; // start off screen
        this.width             = config.width      || 650
        this.speed             = config.speed      || 1.3;
        this.color             = config.color      || "white";
        this.fontSize          = config.fontSize   || 22;
        this.lineHeight        = config.lineHeight || 42;
        this.fontFamily        = config.fontFamily || "viking-normalregular";
        this.skipFontSize      = config.fontFamily || 12;
        this.text              = config.text       || [
            "It was once believed that the Vikings simply vanished with no explicable cause. However, recent revelations have unveiled an alternate history.",
            "The Cecleon Empire... As many empires before them, they too faced a shortage of basic necessities and searched for new gathering sources. With their vast network of intelligence they discovered the land of Idrilya, a gold mine of these necessities.",
            "Desperate for relief, they invaded the peaceful farmers of Idrilya, whom were once known for their fierceness in battle and an endless appetite for conflict. The Cecleons weren't inclined to share the resources and unanimously opted for the extermination of the Vikings.",
            "The Vikings fought and fought but to no avail. The technological superiority of their invaders was too much. They fell by the hundreds and soon there was a new endangered species...",
            "Yet, records speak of a survivor and an outcast who would go on to unite the last of the Vikings and, with their aid (and items laying around the area), face this tentacled threat. Perhaps today we'll put to rest the debates concerning the victors of the Battle for Idrilya."
        ];
        this.skipText = "(Press 'esc' to skip introduction)";

        // Set up local variables
        this.startPosition      = this.position;
        this.scrollingPosCutoff = this.getScrollingTextHeight(this.text, this.width) + this.startPosition;

        // Start the transition in main loop
        textScrolling = true;
    }

    this.update = function () {
        if (!textScrolling) {
            return;
        }

        // Stop scrolling text when it is completely
        // off of screen
        if (this.position < -this.scrollingPosCutoff) {
            textScrolling = false;
        }

        // Move text up `speed` pixel per frame
        this.position -= this.speed;

        this.draw();
    }

    // Draw Image, then scrolling text, extra 
    // bottom image and pulsating skip text
    this.draw = function () {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(introTextPic, 0,0, 800,600);
        this.drawScrollingText(this.text, this.position);
        canvasContext.drawImage(introTextPicBtm, 0,500, 800,100);
        if (this.position < 300) {
            let textAlpha = this.convertPosToAlphaFlux(this.position)
            drawText(this.skipText, 320, 560, "rgba(255,255,255," + textAlpha + ")", this.skipFontSize + "px sans-serif");
            canvasContext.font = this.fontSize + "px " + this.fontFamily; // hack for solving line break issue in create paragraph?!
        }
    }

    // Convert current position to a value between 0-1
    // from 1-50   it goes 0.0 -> 1.0
    // from 51-100 it goes 1.0 -> 0.0
    this.convertPosToAlphaFlux = function (pos) {
        let centiFlux = Math.abs(Math.floor(pos % 100))
        let alphaFlux = centiFlux / 50;
        if(centiFlux > 50) {
            alphaFlux = 2-alphaFlux;
        }
        return alphaFlux;
    }

    // Draw each line of each paragraph moving down 
    // y-axis with `lineHeight` amount each time
    this.drawScrollingText = function (paragraphs) {
        let yPos = this.position;
        paragraphs.forEach((para, index)=> {
            let paraObj = this.createParagraph(para, this.width);
            paraObj.forEach(line => {
                drawText(line.text, 75, yPos + line.height, this.color, this.fontSize + "px " + this.fontFamily);
            });

            yPos += paraObj[paraObj.length-1].height + this.lineHeight;
        });
    }

    // Create a paragraph Object which stores each
    // sentence in `text` with a max width of `width`
    // saved in `height` prop to indicate new pos of 
    // each new line
    this.createParagraph = function (paragraph, width) {
        let words = paragraph.split(' ');
        let lines = [];
        let line = '';
        let lineTest = '';
        let currentY = 0;

        for (let i=0; i<words.length; i++ ) {
            
            lineTest = line + words[i] + ' ';

            // test to see if we overstep width boundary
            if (Math.floor(canvasContext.measureText(lineTest).width) > width) {
                currentY = lines.length * this.lineHeight + this.lineHeight;
                lines.push({ text: line, height: currentY });
                line = words[i] + ' ';
            } else {
                line = lineTest;
            }
        }

        // catch any left over
        if (line.length > 0) {
            currentY = lines.length * this.lineHeight + this.lineHeight;
            lines.push({ text: line.trim(), height: currentY });
        }

        return lines;
    }

    // Calcualte height of entire text
    this.getScrollingTextHeight = function (paragraphs, width) {
        let height = 0
        paragraphs.forEach(para => {
            let paraObj = this.createParagraph(para, width);
            height += paraObj[paraObj.length-1].height + this.lineHeight;
        });

        return height;
    }

})();
