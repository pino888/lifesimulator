const autoButton = document.getElementById("auto");
const gliderButton = document.getElementById("glider");
const content = document.querySelector(".content");
content.style.display = 'flex';
content.style.width = '500px';
content.style.height = '500px';
content.style.flexWrap = 'wrap';
let genCounterDisplay = document.getElementById("gen-counter");
let genCounter = 0;

// create 2d array with random populated cells
let game = [];
const auto = () => {
    game = [];
    for (i = 0; i < 50; i++){
        let row = [];
        for (j = 0; j < 50; j++){
            row.push(Math.floor(Math.random() * 2));
        }
        game.push(row);
    }
}
auto();
const glider = () =>{
    game = [];
    for (i = 0; i < 50; i++){
        let row = [];
        for (j = 0; j < 50; j++){
            row.push(0);
        }
        game.push(row);
    }
    game[1][25] = 1;
    game[2][23] = 1;
    game[2][25] = 1;
    game[3][13] = 1;
    game[3][14] = 1;
    game[3][21] = 1;
    game[3][22] = 1;
    game[4][12] = 1;
    game[4][16] = 1;
    game[4][21] = 1;
    game[4][22] = 1;
    game[4][35] = 1;
    game[4][36] = 1;
    game[5][11] = 1;
    game[5][17] = 1;
    game[5][21] = 1;
    game[5][22] = 1;
    game[5][35] = 1;
    game[5][36] = 1;
    game[6][1] = 1;
    game[6][2] = 1;
    game[6][11] = 1;
    game[6][15] = 1;
    game[6][17] = 1;
    game[6][18] = 1;
    game[6][23] = 1;
    game[6][25] = 1;
    game[7][1] = 1;
    game[7][2] = 1;
    game[7][11] = 1;
    game[7][17] = 1;
    game[7][25] = 1;
    game[8][12] = 1;
    game[8][16] = 1;
    game[9][13] = 1;
    game[9][14] = 1;
    game[10][24] = 1;
    game[11][25] = 1;
    game[11][26] = 1;
    game[12][24] = 1;
    game[12][25] = 1;
}
autoButton.onmouseup = auto;
gliderButton.onmouseup = glider;

// draw cell grid
for (i = 0; i < game.length; i++){
    for (j = 0; j < game[i].length; j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}-${j}`;
        cell.style.width = "10px";
        cell.style.height = "10px";
        cell.style.backgroundColor = "yellow";
        content.appendChild(cell);
    }
}

for (i = 0; i < game.length; i++){
    for (j = 0; j < game[i].length; j++){
        if (game[i][j] == 1){
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = 'black';
        }
        else if (game[i][j] == 0){
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = 'white';
        }
    }
}

let game2 = []
for (i = 0; i < 50; i++){
    let row = [];
    for (j = 0; j < 50; j++){
        row.push(0);
    }
    game2.push(row);
}
// loop through each cell and check how many naighbours alive, update every 100ms
setInterval(() => {
genCounter++;
genCounterDisplay.innerHTML = genCounter;
for (i = 1; i < game.length-1; i++){
    for (j = 1; j < game[i].length-1; j++){
        let alive = 0;
        
        if (game[i-1][j-1] === 1){
            alive++;
        }
        if (game[i-1][j] === 1){
            alive++;
        }
        if (game[i-1][j+1] === 1){
            alive++;
        }
        if (game[i][j-1] === 1){
            alive++;
        }
        if (game[i][j+1] === 1){
            alive++;
        }
        if (game[i+1][j-1] === 1){
            alive++;
        }
        if (game[i+1][j] === 1){
            alive++;
        }
        if (game[i+1][j+1] === 1){
            alive++;
        }

        // change cell status
        if (game[i][j] === 1 && alive < 2){
            game2[i][j] = 0;
        }
        else if (game[i][j] === 1 && alive === 2 || game[i][j] === 1 && alive === 3){
            game2[i][j] = 1;
        }
        else if (game[i][j] === 1 && alive > 3){
            game2[i][j] = 0;
        }
        else if (game[i][j] === 0 && alive === 3){
            game2[i][j] = 1;
        }
    }
}

for (i = 0; i < game2.length; i++){
    for (j = 0; j < game2[i].length; j++){
        if (game2[i][j] == 1){
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = 'black';
        }else if (game2[i][j] == 0){
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = 'white';
        }
    }
}


game = JSON.parse(JSON.stringify(game2));
for (i = 0; i < game2.length; i++){
    for (j = 0; j < game2[i].length; j++){
        game2[i][j] = 0;
    }
}
}, 100)