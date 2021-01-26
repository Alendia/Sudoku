import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
    return <button className="square">{props.value}</button>;
}

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

class Grid extends React.Component {
    renderRegion(i) {
        return <Region className="region" />;
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

class NumInput extends React.Component {
    renderNumber(i) {
        <button className="number" value={i}>
            {i}
        </button>;
    }

    render() {
        let content = [];
        for (let i = 1; i <= 9; i++) {
            content.push(this.renderNumber(i));
        }
        return content
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Sudoku</h1>
                <div className="game-info"></div>
                <div className="game">
                    <Grid className="grid" />
                    <NumInput className="num-input" />
                </div>
                <div className="game-settings"></div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
