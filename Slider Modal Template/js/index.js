var myImage = document.getElementsByClassName("img-fluid"),
    imgOverlay = document.getElementById("light-box"),
    imgItem = document.getElementById("overlay-child"),
    nextImg = document.getElementById("next"),
    prevImg = document.getElementById("previous"),
    closeImg = document.getElementById("close"),
    cuurentSlide = 0,
    imgArray = [];
for (var i = 0; i < myImage.length; i++) {
    imgArray.push(myImage[i]);

    imgArray[i].addEventListener("click", function (e) {
        var cuurentSlide = imgArray.indexOf(e.target);
        imgOverlay.style.display = "flex";
        var imgSrc = (e.target.getAttribute("src"));
        imgItem.style.backgroundImage = "url(" + imgSrc + ")";
    })
}

function nextSlide() {
    cuurentSlide++;
    if (cuurentSlide == imgArray.length) {
        cuurentSlide = 0;
    }
    imgItem.style.backgroundImage = "url(" + imgArray[cuurentSlide].getAttribute('src') + ")";
}

function prevSlide() {
    cuurentSlide--;
    if (cuurentSlide < 0) {
        cuurentSlide = imgArray.length - 1;
    }
    imgItem.style.backgroundImage = "url(" + imgArray[cuurentSlide].getAttribute('src') + ")";
}

function closeSlide() {
    imgOverlay.style.display = "none";
}

nextImg.addEventListener("click", nextSlide);
prevImg.addEventListener("click", prevSlide);
closeImg.addEventListener("click", closeSlide);

document.body.addEventListener("keydown", function (e) {
    if (e.keyCode == 39) {
        nextSlide()
    }
    else if (e.keyCode == 37) {
        prevSlide()
    }
    else if (e.keyCode == 27) {
        closeSlide()
    };
})

imgOverlay.addEventListener("click", function (e) {
    if (e.target == imgItem || e.target == nextImg || e.target == prevImg) {
        return false;
    }
    closeSlide()
})

