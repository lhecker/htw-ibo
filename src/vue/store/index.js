import Vue from "vue";
import Vuex from "vuex";

import { bresenham, indexFromCoordinates } from "../../common/canvas";
import * as config from "../../common/config";
import plainCloneDeep from "../../common/plainCloneDeep";
import rainbowGenerator from "../../common/rainbowGenerator";

Vue.use(Vuex);

const colorGenerator = rainbowGenerator();

const state = {
    current: {
        axisSize: config.axisSize,
        pixels: (() => {
            const pixels = new Array(config.axisSize ** 2);

            for (let i = 0; i < pixels.length; ++i) {
                pixels[i] = {
                    id: i,
                    color: "#fff",
                };
            }

            return pixels;
        })(),
    },
    history: [],
    previewIndex: undefined,
};

const mutations = {
    drawLine(state, { from, to }) {
        const pixels = state.current.pixels;

        for (let pos of bresenham(from, to)) {
            const index = indexFromCoordinates(pos);
            pixels[index].color = colorGenerator.next().value;
        }
    },
    setPixel(state, pos) {
        const pixels = state.current.pixels;
        const index = indexFromCoordinates(pos);
        pixels[index].color = colorGenerator.next().value;
    },
    pushState(state) {
        const current = plainCloneDeep(state.current);

        if (state.currentPreviewIndex !== undefined) {
            state.history.splice(state.currentPreviewIndex + 1, Infinity, current);
            state.currentPreviewIndex = undefined;
        } else {
            state.history.push(current);
        }
    },
    previewState(state, index) {
        index = Math.min(Math.max(0, index), state.history.length - 1);

        state.currentPreviewIndex = index;
        state.current = plainCloneDeep(state.history[index]);
    },
}

function historifyPlugin(store) {
    function onChange(mutation, state) {
        const type = mutation && mutation.type;

        if (type !== "pushState" && type !== "previewState") {
            store.commit("pushState");
        }
    }

    onChange(undefined, store.state);
    store.subscribe(onChange);
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [
        historifyPlugin,
    ],
});
