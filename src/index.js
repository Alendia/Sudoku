import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function arr(numbers) {
    // arr(3) means [1, 2, 3]
    return [...Array(numbers).keys()].map((i) => i + 1);
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// 九格

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // transmit prop
    handleClick(e) {
        let currentSquare = e.target;
        // get square in row index
        let curerntRegionRow = currentSquare.parentNode;
        let regionRowList = Array.from(curerntRegionRow.childNodes);
        let squareInRowIndex = regionRowList.indexOf(currentSquare);
        // get row index
        let regionList = Array.from(curerntRegionRow.parentNode.childNodes);
        let rowIndex = regionList.indexOf(curerntRegionRow);
        // calcute the index
        let index = rowIndex * 3 + squareInRowIndex;
        this.props.square(index);
        this.props.onClick(e);
    }

    render() {
        return arr(3).map((i) => (
            <div className="region-row">
                {arr(3).map((j) =>
                    ((n) => <Square key={n} onClick={this.handleClick} value={this.props.value[n]} />)(
                        (i - 1) * 3 + j - 1
                    )
                )}
            </div>
        ));
    }
}

// 八十一格

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.takeSquare = this.takeSquare.bind(this);
        this.addRegion = this.addRegion.bind(this);
    }

    // transmit a prop
    takeSquare(square) {
        this.props.squareValue(square);
    }

    addRegion(e) {
        let currentSquare = e.target;
        let currentRegion = currentSquare.parentNode.parentNode;
        let currentRegionRow = currentRegion.parentNode;
        let grid = currentRegionRow.parentNode;
        // get region in row index
        let gridRowList = Array.from(currentRegionRow.childNodes);
        let regionInRowIndex = gridRowList.indexOf(currentRegion);
        // get row index
        let gridList = Array.from(grid.childNodes);
        let rowIndex = gridList.indexOf(currentRegionRow);
        // calculate the index
        let index = rowIndex * 3 + regionInRowIndex;
        this.props.regionValue(index);
    }

    render() {
        return arr(3).map((i) => (
            <div className="grid-row">
                {arr(3).map((j) =>
                    ((m) => (
                        <div className="region">
                            {/* m is region index, n is square index */}
                            <Region
                                key={m}
                                square={this.takeSquare}
                                onClick={this.addRegion}
                                value={this.props.value[m]}
                            />
                        </div>
                    ))((i - 1) * 3 + j - 1)
                )}
            </div>
        ));
    }
}

// 数字选择框

function NumList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => (
        <button>
            <li className="number" key={number.toString()} onClick={() => props.onClick(number)}>
                {number}
            </li>
        </button>
    ));
    return <ul>{listItems}</ul>;
}

class TimeRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consumedTime: 0,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let consumedTime = this.state.consumedTime;
        this.setState({ consumedTime: consumedTime + 1 });
    }

    handleGameOver() {
        //
    }

    render() {
        // calculate consumed time
        let consumedTime = this.state.consumedTime;
        let consumedDay = Math.floor(consumedTime / (60 * 24));
        let consumedHour = Math.floor(consumedTime / 60) - consumedDay * 24;
        let consumedSec = Math.floor(consumedTime) - consumedDay * 24 * 60 - consumedHour * 60;

        return (
            <div>
                <span>
                    {consumedDay}:{consumedHour}:{consumedSec}
                </span>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridValue: [...Array(9)].map((_) => [...Array(9).fill(null)]),
            clickedNum: null,
            region: null,
            square: null,
            clicked: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateFillinNum = this.updateFillinNum.bind(this);
        this.handleRegion = this.handleRegion.bind(this);
        this.handleSquare = this.handleSquare.bind(this);
    }

    handleClick(index) {
        this.setState({
            // 我没有写回调函数但是还是很慢……为什么呢
            clickedNum: index,
            clicked: true,
        });
    }

    updateFillinNum() {
        // 此处的 region 和 square 是 index
        let gridValue = this.state.gridValue.slice();
        let region = this.state.region;
        let square = this.state.square;
        gridValue[region][square] = this.state.clickedNum;
        console.log(region, square);
        console.log(gridValue);
        this.setState({
            gridValue: gridValue,
        });
    }

    handleRegion(region) {
        console.log("region", region);
        this.setState({ region: region });
    }

    handleSquare(square) {
        console.log("square", square);
        this.setState({ square: square });
    }

    render() {
        const numbers = Array.from({ length: 9 }, (item, index) => index + 1); // [1...9]
        let currentGrid = this.state.gridValue.slice();
        let regionIndex = this.state.region;
        let squareIndex = this.state.square;
        let squaresContent = currentGrid;

        // update the square value
        if (this.state.clicked === true && this.state.square !== "") {
            console.log(this.state.clicked);
            currentGrid[regionIndex][squareIndex] = this.state.clickedNum;
            console.log("grid", currentGrid);
            squaresContent = currentGrid;
            console.log(squaresContent);
            console.log("num", this.state.clickedNum);
            this.setState({ gridValue: currentGrid, clicked: false, clickedNum: null });
        }

        // check the grid
        let rowRepeatOne;
        let columnRepeatOne;
        let regionRepeatOne;
        if (this.state.clickedNum !== null) {
            rowRepeatOne = CheckRow(regionIndex, squareIndex, currentGrid);
            columnRepeatOne = CheckColumn(regionIndex, squareIndex, currentGrid);
            regionRepeatOne = CheckRegion(regionIndex, squareIndex, currentGrid);
            console.log(rowRepeatOne, columnRepeatOne, regionRepeatOne);
        }

        return (
            <div className="main">
                <h1>Sudoku</h1>
                <div className="game-info">
                    <div className="time">
                        <TimeRecord />
                    </div>
                </div>
                <div className="game">
                    <div className="grid">
                        <Grid regionValue={this.handleRegion} squareValue={this.handleSquare} value={squaresContent} />
                    </div>
                    <div className="num-input">
                        <NumList numbers={numbers} onClick={this.handleClick} />
                    </div>
                </div>
                <div className="game-settings"></div>
            </div>
        );
    }
}

function CheckRegion(region, square, grid) {
    // in region
    console.log(grid, region, square);
    console.log(grid[region], grid[region][square]);
    let squareValue = grid[region][square];
    if (region !== null && square !== null && grid[region].reduce((prev, curr) => curr === squareValue ? prev + 1 : prev + 0) >= 2) {
        return [grid[region][square], true];
    }
}

function CheckRow(region, square, grid) {
    // in row
    const row1 = [0, 1, 2];
    const row2 = [3, 4, 5];
    const row3 = [6, 7, 8];
    const allRows = [row1, row2, row3];
    let sPosition;
    let rPosition;
    let rowValue = [];
    if (region !== null && square !== null) {
        for (const row of allRows) {
            console.log(row);
            if (row.indexOf(region) !== -1) {
                console.log(row);
                rPosition = row;
                console.log(rPosition);
            }
            if (row.indexOf(square) !== -1) {
                sPosition = row;
            }
        }
        console.log(rPosition, sPosition);

        for (let i = 0; i < rPosition.length; i++) {
            for (let j = 0; j < sPosition.length; j++) {
                rowValue.push(grid[rPosition[i]][sPosition[j]]);
            }
        }
        console.log(rowValue);

        let sortedRowValue = rowValue.slice().sort();
        for (let i = 0; i < sortedRowValue.length; i++) {
            if (sortedRowValue[i] !== null && sortedRowValue[i] === sortedRowValue[i + 1]) {
                return [sortedRowValue[i], true];
            }
        }
    }
}

function CheckColumn(region, square, grid) {
    // in column
    const column1 = [0, 3, 6];
    const column2 = [1, 4, 7];
    const column3 = [2, 5, 8];
    const allColumns = [column1, column2, column3];
    let rPosition1;
    let sPosition1;
    let columnValue = [];

    if (region !== null && square !== null) {
        for (const column of allColumns) {
            console.log(column);
            if (column.indexOf(region) !== -1) {
                rPosition1 = column;
            }
            if (column.indexOf(square) !== -1) {
                sPosition1 = column;
            }
        }
        console.log(rPosition1, sPosition1);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                columnValue.push(grid[rPosition1[i]][sPosition1[j]]);
            }
        }
        console.log(columnValue);

        let sortedColumnValue = columnValue.slice().sort();
        for (let i = 0; i < sortedColumnValue.length; i++) {
            if (sortedColumnValue[i] !== null && sortedColumnValue[i] === sortedColumnValue[i + 1]) {
                return [sortedColumnValue[i], true];
            }
        }
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
