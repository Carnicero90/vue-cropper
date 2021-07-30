var app = new Vue({
    el: '#root',
    data: {
        preload: '',
        size: 1.0,
        x: 0,
        y: 0,
        isPicSelected: false,
        clickX: 0,
        clickY: 0,
        pic: null,
        pic_width: 0,
        frame: null,
        grayscale: 0,
        sepia: 0
    },
    methods: {
        preloadPic(event) {

            this.size = 1;

            const f = event.target.files[0];

            this.preload = URL.createObjectURL(f);
            console.log(this.preload)
            const im = new Image();
            im.src = this.preload;
            im.onload = () => {
                const height = im.naturalHeight;
                const width = im.naturalWidth;
                if (width > height) {
                    this.pic_width = 100 * (width / height);
                }
                else {
                    this.pic_width = 100;
                }
            }

            setTimeout(() => {
                this.pic = document.querySelector('#image');
                this.x = 0;
                this.y = 0;
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

        },
        savePic() {
            this.context = this.canvas.getContext('2d');

            this.newImg = new Image();
            this.newImg.src = this.preload;
            this.newImg.onload = () => {
                let x = this.pic.style.left.replace('px', '');
                let y = this.pic.style.top.replace('px', '');
                let w = this.pic.clientWidth;
                let h = this.pic.clientHeight;
                this.context.filter = `grayscale(${this.grayscale}) sepia(${this.sepia})`;
                this.context.drawImage(this.newImg, x,y,w,h);
            }
        }
    },
    mounted() {
        this.frame = document.querySelector('.frame');
        this.canvas = document.querySelector('#croppedImage');

    },
})