import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return <button className="square">{props.value}</button>;
}

// 九格

class Region extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    renderRow(x, y) {
        let content = [];
        for (let i = 0; i < y; i++) {
            let num = x * y + i;
            content.push(this.renderSquare(num));
        }
        return content;
    }

    renderContent(x, y) {
        let content = [];
        for (let i = 0; i < x; i++) {
            content.push(<div className="region-row">{this.renderRow(i, y)}</div>);
        }
        return content;
    }

    render() {
        return this.renderContent(3, 3);
    }
}

// 八十一格

class Grid extends React.Component {
    renderRegion(i) {
        return (
            <div className="region">
                <Region />
            </div>
        );
    }

    renderRow(x, y) {
        let content = [];
        for (let i = 0; i < y; i++) {
            let num = x * y + i;
            content.push(this.renderRegion(num));
        }
        return content;
    }

    renderContent(x, y) {
        let content = [];
        for (let i = 0; i < x; i++) {
            content.push(<div className="grid-row">{this.renderRow(i, y)}</div>);
        }
        return content;
    }

    render() {
        return this.renderContent(3, 3);
    }
}

// 数字选择框

function NumList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li>{number}</li>);
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
                <span>{consumedDay}:{consumedHour}:{consumedSec}</span>
            </div>
        );
    }
}

class App extends React.Component {
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
                        <Grid />
                    </div>
                    <div className="num-input">
                        <NumList numbers={numbers} />
                    </div>
                </div>
                <div className="game-settings"></div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
