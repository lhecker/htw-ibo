<template>
<div :data-id="pixel.id" :style="{backgroundColor: pixel.color}" class="pixel-canvas-cell"/>
</template>

<script>
export default {
    name: "PixelCanvasCell",
    props: {
        pixel: {
            type: Object,
            required: true,
        },
    },
};
</script>
