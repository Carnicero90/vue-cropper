var app = new Vue({
    el: '#root',
    data: {
        preload: '',
        size: 1.0,
        loadedPic: false,
        x: 0,
        y: 0,
        isPicSelected: false,
        previousSet: false,
        clickX: 0,
        clickY: 0
    },
    methods: {
        preloadPic(event) {
            let f = event.target.files[0];
            this.preload = URL.createObjectURL(f);
            this.loadedPic = true;
            const image = document.querySelector('img');
            this.x = 0;
            this.y = 0;
        },
        selectPic(event) {
            this.isPicSelected = true;

            this.clickX = event.clientX - this.x;
            this.clickY = event.clientY - this.y;
        },
        movePic(event) {
            event.preventDefault();
        },
        move(event) {
            if (this.isPicSelected) {
                this.x = event.clientX - this.clickX;
                this.y = event.clientY - this.clickY;
            }
        },
        disselect(event) {
            this.isPicSelected = false;
        }
     },
    mounted() {
    },
})