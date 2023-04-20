
// get canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var leafRightImg = new Image();
leafRightImg.src = "leaf_right.png"
var leafLeftImg = new Image();
leafLeftImg.src = "leaf_left.png"
var leafRightWitherImg = new Image();
leafRightWitherImg.src = "leaf_right_wither.png"
var leafLeftWitherImg = new Image();
leafLeftWitherImg.src = "leaf_left_wither.png"
var flowerRightImg= new Image();
flowerRightImg.src= "flower_right.png"
var flowerLeftImg= new Image();
flowerLeftImg.src= "flower_left.png"



var flower = document.getElementById("importantButton");
var flowerFlag = 0;
importantButton.addEventListener("click", function () {
    flowerFlag = 1;
})

var wither = document.getElementById("offTopicButton");
var witherFlag = 0;
offTopicButton.addEventListener("click", function () {
    witherFlag = 1;
})

/*const show= document.getElementById("showButton")
const rightLeaf= document.getElementById("leaf_right");
showButton.addEventListener("click", ()=>{
    rightLeaf.style.display= "block";
}); */

// define branch color and width
var branchColor = "#97C2B9";
var branchWidth = 4;

// define leaves color and size

var leafSize = 30;
var flowerSize = 30;
var witherSize= 30;

// define plant structures
var tree = {
    x: canvas.width / 2,
    y: canvas.height,
    angle: -Math.PI / 2,
    state: true,
    length: 0,
    depth: 0,
    branches: [
        { angle: -Math.PI / 4, length: 0.7 },
        { angle: Math.PI / 4, length: 0.7 }
    ],
    leaves: [],
    flowers: [],
    withers:[]
    
};

// function to generate branch
function generateTree(branch) {
    // new xy
    var x2 = branch.x;
    var y2 = branch.y - branch.length;

    // generate branches
    ctx.beginPath();
    ctx.moveTo(branch.x, branch.y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = branchColor;
    ctx.lineWidth = branchWidth;
    ctx.stroke();

    if (branch.length % 50 === 0 && branch.state) {
        var flag = (branch.length / 50) % 2 * 2 - 1;
        if (flowerFlag) {
            tree.flowers.push({x: tree.x - flag * branchWidth / 2, y: canvas.height - tree.length, flag: flag});
            flowerFlag = 0;
        } else if (witherFlag){
            tree.withers.push({x: x2 - flag * branchWidth / 2, y: y2, flag: flag})
            witherFlag=0;
        }else{
            tree.leaves.push({x: x2 - flag * branchWidth / 2, y: y2, flag: flag});
        }

    }
}

// function for generating leaves
function drawLeaves() {
    for (var i = 0; i < tree.leaves.length; i++) {
        var leaf = tree.leaves[i];
        if (leaf.flag == -1) // right
            ctx.drawImage(leafRightImg, leaf.x, leaf.y, leafSize, 0.54*leafSize);
        else if (leaf.flag == 1)
            ctx.drawImage(leafLeftImg, leaf.x - leafSize, leaf.y, leafSize, 0.54*leafSize);
    }
}

function drawWithers(){
    for (var i = 0; i < tree.withers.length; i++) {
        var wither= tree.withers[i];
        if (wither.flag == -1) // right
            ctx.drawImage(leafRightWitherImg, wither.x, wither.y, leafSize, 0.54*leafSize);
        else if (wither.flag == 1)
            ctx.drawImage(leafLeftWitherImg, wither.x - leafSize, wither.y, leafSize, 0.54*leafSize);
    }
}


function drawFlowers() {
    for (var i = 0; i < tree.flowers.length; i++) {
        var flower = tree.flowers[i];
        if (flower.flag==-1)
            ctx.drawImage(flowerRightImg, flower.x, flower.y, flowerSize, flowerSize);
        else if (flower.flag==1)
            ctx.drawImage(flowerLeftImg, flower.x- flowerSize, flower.y, flowerSize, flowerSize);
    }
}

/*
function drawFlowers() {
    for (var i = 0; i < tree.flowers.length; i++) {
        var flower = tree.flowers[i];
        ctx.drawImage(flowerImg, flower.x - (flower.flag + 1) / 2 *flowerSize, flower.y, flowerSize, flowerSize);
    }
}
*/


// create animation
var timeline = anime.timeline({
    easing: 'linear',
    duration: 1000,
    loop: true
});

// add
timeline.add({
    update: function() {
        // every time update the animation; increase branch length; renew structure; generate new leaves
        tree.length += 0.5;
        if (tree.length >= 900) {
            tree.length = 900;
            tree.state = false;
        }

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // tree.leaves = [];
        generateTree(tree);
        drawLeaves();
        drawFlowers();
        drawWithers();
    }
});

// start animation
timeline.play();