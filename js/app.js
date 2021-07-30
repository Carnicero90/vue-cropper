var app = new Vue({
    el: '#root',
    data: {
        numbers: 0,
        preload: '',
        lines: 10,
        size: 70,
        loadedPic: false 

    },
    methods: {
        preloadPic(event) {
            let f = event.target.files[0];
            this.preload = URL.createObjectURL(f);
            this.loadedPic = true;

        },
    },
    mounted() {
    },
})