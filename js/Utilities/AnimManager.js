/** Used internally by AnimManager to manage individual animations
 * @param {array} frames - an array of frame objects {x,y} denoting position of frames in a spritesheet
 * @param {number} rate - framerate in milliseconds per frame
 */
class Anim {  
    constructor(frames, rate) {
        this.frames = frames;
        this.rate = rate;
        this.reset();
    }
/** Used internally by AnimManager to update currently playing animation
 * @param {number} dt - time elapsed since previous frame
 */
    update(dt){
        const { rate, frames } = this;
        if((this.curTime += dt) > rate) {
            this.curFrame++
            this.frame = frames[this.curFrame % frames.length];
            this.curTime -= rate;
        }
    }
/** Used internally by AnimManager to reset the animation */
    reset() {
        this.frame = this.frames[0];
        this.curFrame = 0;
        this.curTime = 0;
    }
}
 /** Manages animations for an animated sprite */
class AnimManager {
     /** add an animation to the animation manager
     * @constructor
     * @param {object} e the object you're adding an animation manager to
     */
    constructor(e) {
        this.anims = {};
        this.running = false;
        this.frameSource = e.frame || e;
        this.current = null;
    }
    /** add an animation to the animation manager
     * @param {string} name  - Name of the animation
     * @param {array} frames - an array of frame objects {x,y} denoting position of frames in a spritesheet
     * @param {number} speed - framerate in milliseconds per frame
     */
    add(name, frames, speed) {
        this.anims[name] = new Anim(frames, speed);
        return this.anims[name];
    }
    /** updates the currently playing animation
     * @param {number} dt - time elapsed since previous frame
    */
    update(dt){
        const{current, anims, frameSource} = this;
        if(!current){
            return;
        }
        const anim = anims[current];
        anim.update(dt);
        frameSource.x = anim.frame.x;
        frameSource.y = anim.frame.y;
    }
    /** plays a named animation already added to the animation manager
     * if the animation passed in is already playing, it will continue playing.
     * if different, the current animation is stopped and the new animation starts from the beginning of it's cycle
     * @param {string} anim  - Name of the animation
     */
    play(anim){
        const {current, anims} = this;
        if(anim == current){
            return;
        }
        this.current = anim;
        anims[anim].reset();
    }
    /**
     * Stops the current animation, will leave the last frame played displayed
     */
    stop(){
        this.current = null;
    }
}
