import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return <button className="square">{props.value}</button>;
}

// 九格

class Region extends React.Component {
    render() {
        let arr = (x) => [...Array(x).keys()].map((i) => i + 1);
        return arr(3).map((i) => (
            <div className="region-row">
                {arr(3).map((j) =>
                    ((n) => <Square key={n} onClick={() => this.props.onClick(n)} />)((i - 1) * 3 + j - 1)
                )}
            </div>
        ));
    }
}

// 八十一格

class Grid extends React.Component {
    render() {
        let arr = (x) => [...Array(x).keys()].map((i) => i + 1);
        return arr(3).map((i) => (
            <div className="grid-row">
                {arr(3).map((j) =>
                    ((m) => (
                        <div className="region">
                            {/* m is region index, n is square index */}
                            <Region key={m} onClick={(n) => this.props.onClick(m, n)}/>
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
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateFillinNum = this.updateFillinNum.bind(this);
    }

    handleClick(index) {
        this.setState({
            // 我没有写回调函数但是还是很慢……为什么呢
            clickedNum: index,
        });
    }

    updateFillinNum(region, square) {
        // 此处的 region 和 square 是 index
        let gridValue = this.state.gridValue.slice();
        gridValue[region][square] = this.state.clickedNum;
        console.log(region, square);
        console.log(gridValue);
        this.setState({
            gridValue: gridValue,
        });
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
                        <Grid onClick={(m, n) => {this.updateFillinNum(m, n); console.log(m, n)}} />
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
