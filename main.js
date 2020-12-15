const content = document.querySelector(".content");
content.style.display = 'flex';
content.style.width = '500px';
content.style.height = '500px';
content.style.flexWrap = 'wrap';

// create 2d array with random populated cells
let game = [];
for (i = 0; i < 50; i++){
    let row = [];
    for (j = 0; j < 50; j++){
        row.push(Math.floor(Math.random() * 2));
    }
    game.push(row);
}
// draw cell grid
for (i = 0; i < game.length; i++){
    for (j = 0; j < game[i].length; j++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell${i}${j}`;
        cell.style.width = "10px";
        cell.style.height = "10px";
        cell.style.backgroundColor = "white";
        content.appendChild(cell);
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
for (i = 0; i < game.length; i++){
    for (j = 0; j < game[i].length; j++){
        let alive = 0;
        
        // check previous row and skip cells outside the grid
        if (typeof(game[i-1]) == 'undefined'){
            continue;
        }else{
            if (typeof(game[i-1][j-1]) == 'undefined'){
                continue;
            }else{
                if (game[i-1][j-1] === 1){
                alive++;
                }
            }
            if (game[i-1][j] === 1){
                alive++;
            }
            if (typeof(game[i-1][j+1]) == 'undefined'){
                continue;
            }else{
                if (game[i-1][j+1] === 1){
                alive++;
                }
            }
        }
        // check same row and skip cells outside the grid
        if (typeof(game[i][j-1]) == 'undefined'){
            continue
        }else{
            if (game[i][j-1] === 1){
                alive++;
            }
        }
        if (typeof(game[i][j+1]) == 'undefined'){
            continue
        }else{
            if (game[i][j+1] === 1){
                alive++;
            }
        }
        // check next row and skip cells outside the grid
        if (typeof(game[i+1]) == 'undefined'){
            continue
        }else{
            if (typeof(game[i+1][j-1]) == 'undefined'){
                continue
            }else{
                if (game[i+1][j-1] === 1){
                alive++;
                }
            }
            if (game[i+1][j] === 1){
                alive++;
            }
            if (typeof(game[i+1][j+1]) == 'undefined'){
                continue
            }else{
                if (game[i+1][j+1] === 1){
                alive++;
                }
            }
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
        if (game2[i][j] === 1){
            document.getElementById(`cell${i}${j}`).style.backgroundColor = 'black';
        }else{
            document.getElementById(`cell${i}${j}`).style.backgroundColor = 'white';
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