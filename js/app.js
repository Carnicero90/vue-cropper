var app = new Vue({
    el: '#root',
    data: {
        preload: '',
        size: 100,
        loadedPic: false,
        x: 0,
        y: 0,
        isPicSelected: false,
        clickX: 0,
        clickY: 0
    },
    methods: {
        preloadPic(event) {
            let f = event.target.files[0];
            this.preload = URL.createObjectURL(f);
            this.loadedPic = true;
            const image = document.querySelector('img');

        },
        selectPic(event) {
            this.isPicSelected = true;
            this.clickX = event.clientX;
            this.clickY = event.clientY;
        },
        movePic(event) {
            event.preventDefault();
            if (this.isPicSelected) {
                console.log(event.clientX);
            }
        },
        move(event) {
            if (this.isPicSelected) {
                this.x = event.clientX - this.clickX;
                this.y = event.clientY - this.clickY;
            }
        }
     },
    mounted() {
    },
})