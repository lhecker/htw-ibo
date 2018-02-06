<template>
<div class="container">
    <div class="row">
        <div class="col-md-4 order-md-12">
            <Sidebar/>
        </div>
        <div class="col-md-8">
            <PixelCanvas/>
        </div>
    </div>
</div>
</template>

<script>
import PixelCanvas from "./PixelCanvas";
import Sidebar from "./Sidebar";

export default {
    name: "App",
    components: {
        PixelCanvas,
        Sidebar,
    },
};
</script>

<style>

</style>
