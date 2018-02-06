export default function* rainbowGenerator() {
    for (let h = 0; ; h = (h + 1) % 360) {
        yield `hsl(${h}, 100%, 50%)`;
    }
}
