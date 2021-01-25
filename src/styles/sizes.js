export default {
    down(size) {
        const sizes = {
            xxs: "400px",
            xs: "576px",
            sm: "768px",
            md: "992px",
            lg: "1200px",
            xl: "1400px",
        }
        return `@media (max-width: ${sizes[size]})`
    }
}