function drawBitmapCenteredWithRot(useBitmap, atX, atY, withAng)
{
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function drawRect(topLeftX,topLeftY, width,height, color)
{
	canvasContext.fillStyle = color;
	canvasContext.fillRect(topLeftX,topLeftY, width,height);
}

function drawCircle(centerX,centerY, radius, color)
{
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0, 2*Math.PI, true);
	canvasContext.fill();
}

function drawText(text, x,y, color, font="9px viking-normalregular")
{
	canvasContext.font = font;
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
}

function drawStrokedText(text, x,y, color, font="13px sans-serif", strokeColor="black", strokeWidth="8") {
    canvasContext.font = font;
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = strokeWidth;
    canvasContext.strokeText(text, x, y);
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}

function drawTextWithShadowCentered(text, x,y, color, font="13px sans-serif")
{
	canvasContext.textAlign = "center";
	canvasContext.font = font;
	canvasContext.shadowBlur = 8;
	canvasContext.shadowColor = "black";
	// if these are both 0, it's more like a "glow"
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
	canvasContext.shadowBlur = 0;
	canvasContext.textAlign = "left";
}

function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, lineColor)
{
	canvasContext.beginPath();
	canvasContext.strokeStyle = lineColor;
	canvasContext.lineWidth = "3";
	canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
	canvasContext.stroke();
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity)
{
	canvasContext.save();
	canvasContext.translate(x, y);
	if (angle !== undefined) {
	  canvasContext.rotate(angle);
	}
	if (opacity != null) {
	  canvasContext.globalAlpha = opacity;
	}
	canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
	canvasContext.restore();
}

function drawLine(object1x, object1y, object2x, object2y, lineColor)
{
	canvasContext.beginPath();
	canvasContext.strokeStyle = lineColor;
	canvasContext.li
	canvasContext.moveTo(object1x, object1y);
	canvasContext.lineTo(object2x, object2y);
	canvasContext.stroke();
}