import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
        let arr = (x) => [...Array(x).keys()].map((i) => i + 1);
        return arr(3).map((i) => (
            <div className="region-row">
                {arr(3).map((j) =>
                    ((n) => <Square key={n} onClick={this.handleClick} />)((i - 1) * 3 + j - 1)
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
        let arr = (x) => [...Array(x).keys()].map((i) => i + 1);
        return arr(3).map((i) => (
            <div className="grid-row">
                {arr(3).map((j) =>
                    ((m) => (
                        <div className="region">
                            {/* m is region index, n is square index */}
                            <Region key={m} square={this.takeSquare} onClick={this.addRegion}/>
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
            region: "",
            square: "",
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
        });
    }

    updateFillinNum(e) {
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
        this.setState({region: region})
    }

    handleSquare(square) {
        this.setState({square: square})
    }

    render() {
        const numbers = Array.from({ length: 9 }, (item, index) => index + 1); // [1...9]

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
                        <Grid
                            onClick={this.updateFillinNum}
                            regionValue={this.handleRegion}
                            squareValue={this.handleSquare}
                        />
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

ReactDOM.render(<App />, document.getElementById("root"));
