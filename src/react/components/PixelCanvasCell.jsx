import React from "react";

export default function PixelCanvasCell(props) {
    return (
        <div data-id={props.pixel.id} className="pixel-canvas-cell" style={{ backgroundColor: props.pixel.color }} />
    );
}
