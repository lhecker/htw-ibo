<template>
<div class="pixel-canvas-container">
    <div class="pixel-canvas border" @mouseover="onMouseOver" @mouseleave="onMouseLeave" :style="{gridTemplateColumns: `repeat(${axisSize}, 1fr)`, gridTemplateRows: `repeat(${axisSize}, 1fr)`}">
        <PixelCanvasCell v-for="pixel of pixels" :key="pixel.id" :pixel="pixel"/>
    </div>
</div>
</template>

<script>
import Vuex from "vuex";

import { coordinatesFromIndex } from "../../common/canvas";
import PixelCanvasCell from "./PixelCanvasCell";

export default {
    name: "PixelCanvas",
    components: {
        PixelCanvasCell,
    },
    data() {
        return {
            cursorPosition: undefined,
        };
    },
    computed: {
        axisSize() {
            return this.$store.state.current.axisSize;
        },
        pixels() {
            return this.$store.state.current.pixels;
        },
    },
    mounted() {
        document.addEventListener("mousedown", this.onMouseDown, false);
        document.addEventListener("mouseup", this.onMouseUp, false);
    },
    beforeDestroy() {
        document.removeEventListener("mousedown", this.onMouseDown, false);
        document.removeEventListener("mouseup", this.onMouseUp, false);
    },
    watch: {
        cursorPosition: function (newPos, oldPos) {
            if (!newPos) {
                return;
            }

            if (!oldPos) {
                this.$store.commit("setPixel", newPos);
                return;
            }

            this.$store.commit("drawLine", {
                from: oldPos,
                to: newPos,
            });
        },
    },
    methods: {
        onMouseDown(event) {
            this.isDrawing = true;
            this.setCursorPositionFromEventTarget(event);
        },
        onMouseUp(event) {
            this.isDrawing = false;
            this.cursorPosition = undefined;
        },
        onMouseOver(event) {
            if (this.isDrawing) {
                this.setCursorPositionFromEventTarget(event);
            }
        },
        onMouseLeave(event) {
            this.cursorPosition = undefined;
        },
        setCursorPositionFromEventTarget(event) {
            const target = event.target;

            if (!target.classList.contains("pixel-canvas-cell")) {
                return;
            }

            this.cursorPosition = coordinatesFromIndex(parseInt(target.dataset.id));
        },
    },
};
</script>
