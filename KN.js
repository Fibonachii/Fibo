var q = true;
var cells = [];
var cellNum = [];
var scores1 = 0;
var scores2 = 0;

function createField () {
    var canvas = document.createElement("div");
    canvas.className = "canvas";
    var table = document.createElement("div");
    canvas.appendChild(table);
    table.className = "table";
    for (i = 0; i < 5; i++) {
        cells[i] = [];
        cellNum[i] = [];
        for (j = 0; j < 5; j++) {
            var div = document.createElement("div");
            cellNum[i][j] = 0;
            div.className = "cell";
            cells[i][j] = div;
            table.appendChild(div);
            (function (i,j) {
                    cells[i][j].onclick = function clicker () {
                    
                    console.log(i,j);   
                    if(q) {
                        this.className = "cell player1";
                        cellNum[i][j] = 1;
                        cells[i][j].onclick = null;
                    } else {
                        this.className = "cell player2";
                        cellNum[i][j] = 2;
                        cells[i][j].onclick = null;
                    };
                    q = !q;   
                    if(winCheck(cellNum[i][j], i, j) == 1) { 
                        alert("Победа игрока 1");
                        canvas.parentNode.removeChild(canvas);
                        scores1++; 
                        createField ();
                    }
                    else if(winCheck(cellNum[i][j], i, j) == 2) { 
                        alert("Победа игрока 2");
                        canvas.parentNode.removeChild(canvas);
                        scores2++;
                        createField ();
                    }
                }
            })(i,j)
        }
        document.body.appendChild(canvas);
    }
}

function scoresDisplay (argument) {
    
}

function winCheck (move, y, x) {
    
    var win = 0;
    var chk = [{
        x: -1,
        y: -1
    },{
        x: 0,
        y: -1
    },{
        x: +1,
        y: -1
    },{
        x: -1,
        y: 0
    },{
        x: +1,
        y: 0
    },{
        x: -1,
        y: +1
    },{
        x: 0,
        y: +1
    },{
        x: +1,
        y: +1
    }];

    chk.forEach(function(pos) {
        var posX = x + (2 * pos.x);
        var posY = y + (2 * pos.y);
        if (isRly(y + pos.y, x + pos.x)) {
            if(move == cellNum[y + pos.y][x + pos.x]) {
                if (isRly(posY, posX)) {
                    if(move == cellNum[posY][posX]) win = move;     
                } else if (isRly(y - pos.y, x - pos.x)) {
                    if(move == cellNum[y - pos.y][x - pos.x]) win = move;
                }
            }
        }
    })
    return win;
}


function isRly(y, x) {
    return typeof cellNum[y] !== 'undefined' && typeof cellNum[y][x] !== 'undefined';
}

createField ();