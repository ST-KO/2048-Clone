let board;
let score = 0;
let rows = 4;
let colums = 4;

window.onload = () => {
    setGame();
};

const setGame = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < colums; c++)
        {
            let tile = document.createElement("div"); // Creating <div></div> 
            tile.id = r.toString() + "-" + c.toString(); // Setting id attribute to it, <div id="0-0"></div>
            let num = board[r][c]; // Setting number from corresponding row and col of the board to num 
            
            updateTile(tile, num);
            
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
};

const hasEmptyTile = () => {
    
    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < colums; c++)
        {
            if(board[r][c] == 0)
            {
                return true;
            }
        }
    }

    return false;
};

const setTwo = () => {
    
    if(!hasEmptyTile())
    {
        return;
    }
    
    let found = false;
    while(!found)
    {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * colums);

        if(board[r][c] == 0)
        {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
};

const updateTile = (tile, num) => {
    tile.innerText = "";
    tile.classList.value = ""; // Clear the classList to void having multiple classes
    tile.classList.add("tile");

    if(num > 0)
    {
        tile.innerText = num;

        if(num <= 4096)
        {
            
            tile.classList.add("x"+ num.toString()); 
        }
        else
        {
            // When num on tile is bigger than 4096 (8192 and above), add the "x8192" attribute value to class. 
            // So that 8192 and above tiles will have the same background-color set to .x8192 in CSS.
            tile.classList.add("x8192");
        }
    }

};

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft")
    {
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight")
    {
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp")
    {
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown")
    {
        slideDown();
        setTwo();
    }

    document.getElementById("score").innerText = score;
});

const filterZero =  (row) => {
    return row.filter((num) => num != 0); // Creating new array without '0'
};

const slide = (row) => {
    
    // For eg: [0, 2, 2, 2]
    row = filterZero(row); // then remove '0s'. [0, 2, 2, 2] ---> [2, 2, 2]

    // Sliding 
    for(let i = 0; i < row.length; i++)
    {
        // Check every '2'
        if(row[i] == row[i + 1])
        {
            row[i] = row[i] + row[i + 1];
            row[i + 1] = 0;
            score += row[i];
        }
    } // result: [2, 2, 2] --> [4, 0, 2]

    row = filterZero(row); // [4, 0, 2] --> [4,2]

    // Add '0s' back 
    while(row.length < colums)
    {
        row.push(0);
    } // [4, 2] ---> [4, 2, 0, 0]

    return row;
};

const slideLeft = () => {
    for(let r = 0; r < rows; r++)
    {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < colums; c++)
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideRight = () => {
    for(let r = 0; r < rows; r++)
    {
        let row = board[r];

        row.reverse();

        row = slide(row);

        row.reverse(); 

        board[r] = row;

        for(let c = 0; c < colums; c++)
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideUp = () => {
    for(let c = 0; c < colums; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        //board[0][c] = row[0];
        //board[1][c] = row[1];
        //board[2][c] = row[2];
        //board[3][c] = row[3];

        for(let r = 0; r < rows; r++)
        {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideDown = () => {
    for(let c = 0; c < colums; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let r = 0; r < rows; r++)
        {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};