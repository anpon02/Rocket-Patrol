/*
Ankie Pon
Project: Rocket Patrol Mods
4/18/22

Took: 2 days to complete the project

Mods:
    Starting:
        - Control Rocket after fire (5pts)
        - 'FIRE' UI test from orig game (5pts)
    Novice: 
        - Paralax scrolling (10pts)
        - new Title screen (10pts)
        - new UI boarders (10pts)
    Intermediate Tier:
        - new artwork for in-game assets (20pts)

    Shrek Tier
        - two player mode (30pts)
*/

//configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

//game declaration
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyW;

//set UI sizes
let borderUISize= game.config.height / 15;
let borderPadding = borderUISize / 3;
