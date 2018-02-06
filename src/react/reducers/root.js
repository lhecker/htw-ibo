import Immutable from "immutable";

import { bresenham, indexFromCoordinates } from "../../common/canvas";
import { axisSize } from "../../common/config";
import rainbowGenerator from "../../common/rainbowGenerator";
import * as actions from "../actions";

const colorGenerator = rainbowGenerator();

const Pixel = Immutable.Record({
    id: undefined,
    color: "#fff",
});

const RootState = Immutable.Record({
    axisSize: axisSize,
    pixels: Immutable.List()
        .setSize(axisSize ** 2)
        .withMutations(pixels => {
            for (let i = 0; i < pixels.size; ++i) {
                pixels.set(i, new Pixel({ id: i }));
            }
        }),
});

export default function rootReducer(state = RootState(), action) {
    switch (action.type) {
        case actions.SET_PIXEL:
            const id = indexFromCoordinates(action.pos);
            state = state.setIn(
                ["pixels", id, "color"],
                colorGenerator.next().value
            );
            break;
        case actions.DRAW_LINE:
            state = state.update("pixels", pixels =>
                pixels.withMutations(pixels => {
                    for (let pos of bresenham(action.from, action.to)) {
                        const id = indexFromCoordinates(pos);
                        pixels.setIn(
                            [id, "color"],
                            colorGenerator.next().value
                        );
                    }
                })
            );
            break;
    }

    return state;
}
