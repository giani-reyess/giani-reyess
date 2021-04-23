const canvas = document.getElementById('canvas1') // Obtainig the canvas id  
const ctx = canvas.getContext('2d') // Setting a 2d context to draw

const resolution = 10 // the size of each square
canvas.width = 800
canvas.height = 800

const COLUMNS = canvas.width / resolution
const ROWS = canvas.height / resolution



// BUILDING THE LOGIC OF THE GRID 
function buildGrid() {
    // Create a (defined by COLUMNS) null elemnts array  
    return  new Array(COLUMNS).fill(null)
            // Replace elements with arrays (defined by ROWS)where each element is 0
            .map(() => new Array(ROWS).fill(null)
                .map(() => Math.floor(Math.random() * 2)))
} // And as result, we get an array where each element is another 
  // array but filled with zeros
let grid = buildGrid()



//SAVE EACH GENERATION 
function nextGen(grid) {  
    // Map each array (ROWS) inside the other array (COLUMNS) saving its states.
    // In other words make a copy of a whole generation od cells
    const nextGen = grid.map(arr => [... arr])
    

    // // Looping to reach each elements in COLUMNS
    for(let col = 0; col < grid.length; col++){
        // Looping to reach each elements in ROWS
        for(let row = 0; row < grid[col].length; row++){  
            const cell = grid[col][row] // Finding the current cell
            let numNeighbours = 0
            // Looping through the rows and jumping over the cell where
            // i = 0 and j = 0 (this one will be the cell) 
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if (i === 0 && j === 0){
                        continue
                    }
                    const x_cell = col + i
                    const y_cell = row + j

                    if(x_cell >= 0 && y_cell >= 0 && x_cell < COLUMNS && y_cell < ROWS){
                        const currentNeighbour = grid[col + i][row + j] 
                        numNeighbours += currentNeighbour
                    }
                }
            } 
            if(cell === 1 && numNeighbours < 2){
                nextGen[col][row] = 0
            }else if(cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0
            }else if(cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1
            }
        }
    }        
    return nextGen
}



function update() {
    grid = nextGen(grid)
    render(grid)
    requestAnimationFrame(update)
}
requestAnimationFrame(update)



// RENDER THE GRID
function render(grid) {
    // Iterate to render columns
    for(let col = 0; col < grid.length; col++){
        // Iterate to render rows
        for(let row = 0; row < grid[col].length; row++){
            // stores the number of rows and columns  
            const cell = grid[col][row] 

            ctx.beginPath()
            // Rende de dimentions of rectangle
            ctx.rect(col * resolution, row * resolution, resolution, resolution)
            ctx.fillStyle = cell ? 'black' : 'white'
            ctx.fill()
        }    
    }
    
}
render(grid)