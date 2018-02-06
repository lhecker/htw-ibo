<template>
<form>
    <div class="form-group">
        <label for="history">History ({{maxValue + 1}} entries)</label>
        <input id="history" class="form-control" type="range" min="0" :max="maxValue" v-model.number="historyIndex"/>
        <small class="form-text text-muted">Currently viewing entry {{historyIndex + 1}}</small>
    </div>
</form>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            historyIndex: this.maxValueFromStore(),
        };
    },
    computed: {
        maxValue() {
            return this.maxValueFromStore();
        },
    },
    watch: {
        maxValue(val) {
            this.historyIndex = val;
        },
        historyIndex(val) {
            this.$store.commit("previewState", val);
        },
    },
    methods: {
        maxValueFromStore() {
            return this.$store.state.history.length - 1;
        },
        onInput(event) {
            console.log("onInput", event);
        },
    },
};
</script>
