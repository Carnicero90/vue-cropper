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
        // filters
        grayscale: 0,
        sepia: 0,

        canvas: '',
        canvasURL: '',
        editing: false,
    },
    methods: {
        preloadPic(event) {
            /*
            all'evento change sull'input file, usa l'immagine caricata dall'utente come src di #image,
            ridimensionandola a seconda del rapporto di forma dell'immagine originale.
            */

            this.size = 1;

            const f = event.target.files[0];

            this.preload = URL.createObjectURL(f);
            const im = new Image();
            im.src = this.preload;
            im.onload = () => {
                // devo necessariamente fare sta roba perche usando direttamente this.pic per recuperare le dimensioni non ho risultati sempre attendibili
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
                // necessario anche un settimeout (o un nexttick), se non differisco non mi trova l'immagine
                this.pic = document.querySelector('#image');
                this.x = 0;
                this.y = 0;
            })
        },

        selectPic(event) {
            /*
            se è stata caricata l'immagine, all'evento click si "segna" che l'immagine è stata selezionata
            e le coordinate dell'evento
            */
            if (this.pic) {
                this.isPicSelected = true;
                this.clickX = event.clientX - this.x;
                this.clickY = event.clientY - this.y;
            }

        },
        movePic(event) {
            // previene il drag dell'immagine
            event.preventDefault();
        },
        move(event) {
            // se l'immagine è selezionata, la fa spostare seguendo il cursore
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

        undo() {
            // resetta i filtri e le dimensioni allo stato iniziale
            this.size = 1;
            this.sepia = 0;
            this.grayscale = 0;
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
                // this.canvas.style.width = w*10+'px';
                // this.canvas.style.height = h*10+'px';

                /* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
                    documentato qua, si tratta di una funzione sperimentale non molto compatibile coi vari browser
                */

                this.context.filter = `sepia(${this.sepia}%) grayscale(${this.grayscale}%)`;
                this.context.drawImage(this.newImg, x,y,w,h);
            }

            // testing 
            // document.querySelector('#croppedImage').toBlob((blob)=> {
            //     var newImg = document.createElement('img'),
            //      url = URL.createObjectURL(blob);
            //     this.preload = url;

            //     newImg.onload = function() {
            //         URL.revokeObjectURL(url);
            //     };
            // })
            // let sr = new Image();
            // a = this.canvas.toDataURL("image/jpeg")
            // console.log(a)
            // this.pic.src = a;

            // this.pic.src = this.canvas.toDataURL();
        }
    },
    mounted() {
        this.frame = document.querySelector('.frame');
        this.canvas = document.querySelector('#croppedImage');

    },
})