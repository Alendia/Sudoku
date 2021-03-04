function GetRowCol(grid) {
    // get all rows and columns for easy use
    let allRows = [];
    let rowOne = [];
    let rowTwo = [];
    let rowThree = [];
    let allCols = [];
    let colOne = [];
    let colTwo = [];
    let colThree = [];
    let arr = (num) => [...Array(num).keys()];

    //for of is for first-order array
    //for in is for high-order array
    for (const region in grid) {
        // get every row (reconstruct the grid array)
        let rowsInRegion = [];
        console.log(grid[region]);
        for (let i = 0; i < grid[region]?.length; i += 3) {
            rowsInRegion.push(grid[region].slice(i, i + 3));
        }
        console.log(rowsInRegion);
        rowOne.push(rowsInRegion[0]);
        rowTwo.push(rowsInRegion[1]);
        rowThree.push(rowsInRegion[2]);

        // get every column
        let squaresRearrange = [];
        arr(3).map((i) => {
            arr(3).map((j) =>
                ((n) => {
                    squaresRearrange.push(grid[region][n]);
                })(j * 3 + i)
            );
        });
        console.log(squaresRearrange);
        colOne.push(squaresRearrange.slice(0, 3));
        colTwo.push(squaresRearrange.slice(3, 6));
        colThree.push(squaresRearrange.slice(6, 9));
    }
    console.log(rowOne);
    console.log(colOne);

    // rearrange rows
    rowOne = rowOne.flat();
    rowTwo = rowTwo.flat();
    rowThree = rowThree.flat();
    console.log(rowOne);

    for (let i = 0; i < 27; i += 9) {
        allRows.push(rowOne.slice(i, i + 9));
        allRows.push(rowTwo.slice(i, i + 9));
        allRows.push(rowThree.slice(i, i + 9));
    }
    console.log(allRows);

    // rearrange columns
    arr(3).map((i) => {
        let col1 = [];
        let col2 = [];
        let col3 = [];
        arr(3).map((j) => {
            ((n) => {
                col1 = col1.concat(colOne[n]);
                col2 = col2.concat(colTwo[n]);
                col3 = col3.concat(colThree[n]);
            })(j * 3 + i);
        });
        allCols.push(col1);
        allCols.push(col2);
        allCols.push(col3);
    });
    console.log(allCols);
}

// if we have already generated a sudoku, we try to get all values for each empty square
function GetGrid(grid, x, y) {
    // x is column index, y is row index
    const xIndex = Math.floor(x / 3);
    const yIndex = Math.floor(y / 3);

    const index = 3 * yIndex + xIndex;
    return grid[index];
}

function GetNums(row, column, region) {
    // row is an array, where the square stays, same as column and region
    const arr = Array(9).fill(0);

    for (let i = 0; i < 9; i++) {
        row[i] ?? arr[Number(row[i] - 1)]++;
        column[i] ?? arr[Number(column[i] - 1)]++;
        region[i] ?? arr[Number(region[i] - 1)]++;
    }

    return arr.map((num, index) => (num === 0 ? index : 0)).filter((num) => num !== 0);
}

function SolveSudoku(grid) {}
function InitSudoku() {}
