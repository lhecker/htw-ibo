import React from "react";
import { connect } from "react-redux";

import { coordinatesFromIndex } from "../../common/canvas";
import { drawLine, setPixel } from "../actions";
import PixelCanvasCell from "../components/PixelCanvasCell";

class PixelCanvas extends React.PureComponent {
    state = {
        isDrawing: false,
        cursorPosition: undefined,
    };

    render() {
        const canvasStyle = {
            gridTemplateColumns: `repeat(${this.props.axisSize}, 1fr)`,
            gridTemplateRows: `repeat(${this.props.axisSize}, 1fr)`,
        };

        return (
            <div className="pixel-canvas-container">
                <div className="pixel-canvas border" style={canvasStyle} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                    {this.props.pixels.map(pixel => (<PixelCanvasCell key={pixel.id} pixel={pixel} />))}
                </div>
            </div>
        );
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.onMouseDown, false);
        document.addEventListener("mouseup", this.onMouseUp, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onMouseDown, false);
        document.removeEventListener("mouseup", this.onMouseUp, false);
    }

    onMouseDown = event => {
        this.setState({
            isDrawing: true,
        });
        this.setCursorPositionFromEventTarget(event);
    };

    onMouseUp = event => {
        this.setState({
            isDrawing: false,
            cursorPosition: undefined,
        });
    };

    onMouseOver = event => {
        if (this.state.isDrawing) {
            this.setCursorPositionFromEventTarget(event);
        }
    };

    onMouseLeave = event => {
        this.setState({
            cursorPosition: undefined,
        });
    };

    setCursorPositionFromEventTarget(event) {
        const target = event.target;

        if (!target.classList.contains("pixel-canvas-cell")) {
            return;
        }

        const oldPos = this.state.cursorPosition;
        const newPos = coordinatesFromIndex(parseInt(target.dataset.id));

        if (oldPos === newPos) {
            return;
        }

        if (oldPos) {
            this.props.drawLine(oldPos, newPos);
        } else {
            this.props.setPixel(newPos);
        }

        this.setState({
            cursorPosition: newPos,
        });
    }

    setCursorPosition(pos) {
        this.setState({
            cursorPosition: pos,
        });
    }
}

function mapStateToProps(state) {
    return {
        axisSize: state.current.axisSize,
        pixels: state.current.pixels,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPixel(pos) {
            dispatch(setPixel(pos));
        },
        drawLine(from, to) {
            dispatch(drawLine(from, to));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PixelCanvas);
