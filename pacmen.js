var pos = 0;
var BreakException = {};
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
const blods = [
    'images/BLOD.png'
]
var direction = 0;
var pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(20); // {x:?, y:?}
    let position = setToRandom(500);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0][0];
    newimg.width = 100;
    //
    // set position here 
    //

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}
function createBlod(position,size){
    let game = document.getElementById("game");
    let blod = document.createElement('img');
    blod.style.position = 'absolute';
    blod.src = blods[0];
    blod.width = size;
    blod.style.zIndex = -1;
    blod.style.left = position.x;
    blod.style.top = position.y;
    game.appendChild(blod);
    setTimeout(clearBlod,8000,blod);

}
function clearBlod(blod){
    let game = document.getElementById("game");
    game.removeChild(blod);
}
function checkHit(item, index) {
    for (let i = 0; i < pacMen.length; i++) {
        if (isHit(item, pacMen[i]) && i != index) {
            let v1 = item.velocity.x;
            let v2 = pacMen[i].velocity.x;
            let p1 = item.position.x;
            let p2 = pacMen[i].position.x;
            if (v1 < 0 && v2 < 0) {
                if (p1 > p2) {
                    item.newimg.width += 10;
                    createBlod(pacMen[i].position,pacMen[i].newimg.width);
                    kill(i);
                }
                if (p1 < p2) {
                    pacMen[i].newimg.width += 10;
                    createBlod(item.position,item.newimg.width);
                    kill(index);
                }
            }
            if (v1 > 0 && v2 > 0) {
                if (p1 > p2) {
                    pacMen[i].newimg.width += 10;
                    createBlod(item.position,item.newimg.width);
                    kill(index);
                }
                if (p1 < p2) {
                    item.newimg.width += 10;
                    createBlod(pacMen[i].position,pacMen[i].newimg.width);
                    kill(i);
                }
            }
            if (v1 < 0 && v2 > 0 || v1 > 0 && v2 < 0) {
                pacMen[i].velocity.x = - pacMen[i].velocity.x;
                item.velocity.x = - item.velocity.x;
            }
        }
    }

}
function isHit(obj1, obj2) {
    if (Math.abs(obj1.position.x - obj2.position.x) < (obj2.newimg.width + obj1.newimg.width) / 4) {
        if (Math.abs(obj1.position.y - obj2.position.y) < (obj1.newimg.height + obj2.newimg.height) / 4) {
            return true;
        }
    }
    return false;
}
function kill(item) {
    pacMen[item].newimg.width = 0;
    pacMen[item].newimg.height = 0;
    pacMen[item].velocity.x = 0;
    pacMen[item].velocity.y = 0;
    pacMen[item].position.x = - 200;  
    document.getElementById('game').removeChild(pacMen[item].newimg);  
}
function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item, index) => {
        checkHit(item, index);
        checkCollisions(item)
        if (!item.changer) {
            item.changer = 1;
        }
        else if (item.changer === 1) {
            item.changer = 0;
        }
        else if (item.changer === 0) {
            item.changer = 1;
        }
        if (item.velocity.x > 0) {
            item.newimg.src = pacArray[0][item.changer];
        }
        else {
            item.newimg.src = pacArray[1][item.changer];
        }
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    });
    setTimeout(update, 150);
}

function checkCollisions(item) {

    if (item.position.x + item.velocity.x > window.innerWidth - item.newimg.width || item.position.x + item.velocity.x < 0) {
        item.velocity.x = - item.velocity.x
    }
    if (item.position.y + item.velocity.y < 0 || item.position.y > window.innerHeight - item.newimg.height) {
        item.velocity.y = - item.velocity.y;
    }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}