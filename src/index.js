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
    const listItems = numbers.map((number) => 
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    )
}

class App extends React.Component {
    render() {
        const numbers = Array.from({length: 9}, (item, index) => index + 1); // [0...9]

        return (
            <div className="main">
                <h1>Sudoku</h1>
                <div className="game-info"></div>
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
