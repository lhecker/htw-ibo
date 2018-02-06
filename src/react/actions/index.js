export const PREVIEW_STATE = "PREVIEW_STATE";

export const DRAW_LINE = "DRAW_LINE";
export const SET_PIXEL = "SET_PIXEL";

export function previewState(index) {
    return {
        type: PREVIEW_STATE,
        index,
    };
}

export function drawLine(from, to) {
    return {
        type: DRAW_LINE,
        from,
        to,
    };
}

export function setPixel(pos) {
    return {
        type: SET_PIXEL,
        pos,
    };
}
