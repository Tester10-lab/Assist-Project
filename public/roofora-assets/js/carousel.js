$(function () {
    var owl = $('.partners-con .owl-carousel');
    owl.owlCarousel({
        margin: 30,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    })
})
$(function () {
    var owl = $('.products-con .owl-carousel');

    function initializeCarousel(marginValue) {
        owl.owlCarousel('destroy'); // Destroy existing instance if any
        owl.owlCarousel({
            margin: marginValue,
            nav: false,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },

            }
        });
    }

    function adjustMargin() {
        if (window.innerWidth <= 1200) {
            initializeCarousel(15);
        } else if (window.innerWidth <= 991) {
            initializeCarousel(20);
        } else {
            initializeCarousel(30); // Default margin for larger screens
        }
    }

    // Initial call to set the correct margin
    adjustMargin();

    // Adjust carousel on window resize
    $(window).on('resize', function () {
        adjustMargin();
    });
});

$('#calcPrice').click(function () {
    var base = parseFloat($('#service').val());
    var urgency = parseFloat($('#urgency').val());
    var property = parseFloat($('#property').val());

    var finalPrice = Math.round(base * urgency * property);
    $('#price').text('$' + finalPrice);
});


// photo gallery script
$(document).on('click', '[data-target="#lightbox"]', function () {
    var $lightbox = $('#lightbox'),
        $img = $(this).find('img'),
        src = $img.attr('src'),
        alt = $img.attr('alt'),
        css = {
            'maxWidth': $(window).width() - 100,
            'maxHeight': $(window).height() - 100
        };
    $lightbox.find('img').attr('src', src).attr('alt', alt).css(css);
}).on('shown.bs.modal', '#lightbox', function () {
    var $img = $(this).find('img');
    $(this).find('.modal-dialog').css({
        'width': $img.width()
    });
    $(this).find('.close').removeClass('hidden');
});

// photo gallery script
if ($('#popupImage').length) {
    var images = [ /*...*/
            "assets/images/gallery-img1.jpg",
            "assets/images/gallery-img2.jpg",
            "assets/images/gallery-img3.jpg",
            "assets/images/gallery-img4.jpg",
            "assets/images/gallery-img5.jpg",
            "assets/images/gallery-img6.jpg",
            "assets/images/gallery-img7.jpg",
        ],
        currentIndex = 0;

    $(document).on('click', '#popupImage', function () {
        $(this).attr('src', images[currentIndex]);
        currentIndex = (currentIndex + 1) % images.length;
    });
}

// service location

document.addEventListener("DOMContentLoaded", function () {

    const boxes = document.querySelectorAll(".location-box");
    const marker = document.querySelector(".map-container figure img");

    // 👉 har location ke liye fixed positions (🔥 MAIN CHANGE)
    const positions = [{
            top: "35%",
            left: "55%"
        }, // Mesa
        {
            top: "30%",
            left: "60%"
        }, // Scottsdale
        {
            top: "40%",
            left: "40%"
        }, // Phoenix
        {
            top: "50%",
            left: "30%"
        }, // Buckeye
        {
            top: "38%",
            left: "25%"
        }, // Peoria
        {
            top: "45%",
            left: "35%"
        }, // Glendale
        {
            top: "55%",
            left: "40%"
        }, // Goodyear
        {
            top: "42%",
            left: "65%"
        } // Gilbert
    ];

    boxes.forEach(function (box, index) {
        box.addEventListener("click", function () {

            // ACTIVE CLASS (same as your code)
            boxes.forEach(function (b) {
                b.classList.remove("active");
            });
            this.classList.add("active");

            // 👉 PIN MOVE (🔥 MAIN LOGIC)
            marker.style.top = positions[index].top;
            marker.style.left = positions[index].left;

        });
    });

});
// 
const form = document.getElementById("quoteForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Your request has been submitted!");
    });
}
// 
$(document).ready(function () {

    const dropArea = $('#dropArea');
    const fileInput = $('#fileInput');
    const textSpan = $('#dropArea span');

    // Click open
    dropArea.on('click', function (e) {
        if ($(e.target).is('#fileInput')) return;
        fileInput[0].click();
    });

    // File select hone ke baad naam show karo
    fileInput.on('change', function () {
        if (this.files.length > 0) {

            let fileNames = [];

            for (let i = 0; i < this.files.length; i++) {
                fileNames.push(this.files[i].name);
            }

            textSpan.text(fileNames.join(', '));
        }
    });

});

// 
$(document).ready(function () {

    function calculate() {
        var squares = parseFloat($('#squares').val());

        if (isNaN(squares) || squares < 0) {
            squares = 0;
        }

        var bundles = Math.ceil(squares * 3);
        var rolls = Math.ceil(squares / 10);

        $('#bundles').text(bundles);
        $('#rolls').text(rolls);
    }

    calculate();

    $('#squares').on('input', function () {
        calculate();
    });

});