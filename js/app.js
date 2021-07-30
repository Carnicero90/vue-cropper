var app = new Vue({
    el: '#root',
    data: {
        preload: '',
        size: 1.0,
        loadedPic: false,
        x: 50,
        y: 50,
        isPicSelected: false,
        previousSet: false,
        clickX: 0,
        clickY: 0,
        pic: null,
        pic_width: 0,
        pic_height: 0,
        frame: null,
    },
    methods: {
        preloadPic(event) {

            let f = event.target.files[0];
            this.preload = URL.createObjectURL(f);
            this.x = 0;
            this.y = 0;
            this.pic = document.querySelector('img');

            this.$nextTick(() => {
                this.pic_width = this.pic.clientWidth;
                this.pic_height = this.pic.clientHeight;
                this.loadedPic = true;

            })

        },
        selectPic(event) {
            if (this.pic) {
                this.isPicSelected = true;
                this.clickX = event.clientX - this.x;
                this.clickY = event.clientY - this.y;
            }

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
            if (this.pic) {
                this.isPicSelected = false;
                this.readjust();
            }

        },
        readjust() {
            if (this.pic.offsetTop > 0) {
                this.y = 0;
            }
            else if (this.pic.offsetTop < this.frame.clientHeight - this.pic.clientHeight) {

                this.y = this.frame.clientHeight - this.pic.clientHeight;
            }

            if (this.pic.offsetLeft < this.frame.clientWidth - this.pic.clientWidth) {
                this.x = this.frame.clientWidth - this.pic.clientWidth;
            }
            else if (this.pic.offsetLeft > 0) {
                this.x = 0;
            }

        }
    },
    mounted() {
        this.frame = document.querySelector('.frame');
    },
    computed: {
        getWidth() {

            return
        }
    }
})