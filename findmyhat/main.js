const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10; //row
const width = 10;  //col

const field = [[]];

let cursorRow = 0;
let cursorCol = 0;


// generate game field
function generateField() {

    for (let row = 0; row < height; row++) {
        field[row] = [];

        for (let col = 0; col < width; col++) {
            //Default is all field
            //Check for certain probablity to either generate a field character or a hole
            //Math.random()
            //generate a random num between 0 to 9
            // check if the random num < 2 then we will display a hole
            // check if the random num >=2 then we will display a field

            let prob = (Math.floor(Math.random() * 10));

            if ( prob < 1) {
                field[row][col] = hole;
            } else {
                field[row][col] = fieldCharacter;
            }
        }
    }

    //Display the character at (0,0)
    field[cursorRow][cursorCol] = pathCharacter;

    //Display the Hat at random
    let row1= (Math.floor(Math.random() * height)); 
    let col1= (Math.floor(Math.random() * width));
    field[row1][col1] = hat;

} //End of generateField function




function printField() {

    //print game field with cursor
    clear();
    let display = field.map(row => { return row.join('');}).join('\n');
    console.log(display);
    

} //End of printField function




function moveCursor() {
    // Get user input for direction
    const direction = prompt('Which way? ').toLowerCase();

    switch (direction) {
        case "u":
            cursorRow--;  
            break;
        case "d":
            cursorRow++;
            break
        case "r":
            cursorCol++;
            break
        case "l":
            cursorCol--;
            break
        default:
            console.log("Enter u, d, l or r");
            break
        }
 
    }// End of moveCursor function
 
    


function startGame() {

    let isPlaying = true;

    while (isPlaying) {

        printField();
        moveCursor();

        if (cursorRow < 0 || 
            cursorRow >= height || 
            cursorCol < 0 || 
            cursorCol >= width) 
        {
            console.log("Out of bounds - Game End!");
            isPlaying = false;

        } else if (field[cursorRow][cursorCol] == hat) {
            isPlaying = false;
            console.log("Congrats, you found your hat!");

        } else if (field[cursorRow][cursorCol] == hole) {
            console.log("Sorry you fell down a hole!");
            isPlaying = false;
        }

        field[cursorRow][cursorCol] = pathCharacter;
    }
} //End of startGame function


generateField();
startGame();






