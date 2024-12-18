// dark- light mode 
function toggleFun() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }

//  text retype animation script
 var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid rgb(41, 175, 142)}";
    document.body.appendChild(css);
};

//============= for loader script


// var loader = document.getElementById("loader-ctn");
// // var loadercontainer = document.getElementById("loadercontainer");

// window.addEventListener("load", function () {
//     loader.style.display = "none";
// })


// ========script for tilt effect for card 

    const cards = document.querySelectorAll('.card');

// Loop through each card and add event listeners for 3D tilt and effects
cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title');

    // Add an event listener for mouse movement over each card
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left; // X within the card
        const y = e.clientY - cardRect.top;  // Y within the card

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;

        // Tilt effect for the card
        const rotateX = ((y - centerY) / centerY) * 10; // Adjust tilt intensity
        const rotateY = ((centerX - x) / centerX) * 10;

        // Apply tilt transform and shadow to the card
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 20px rgba(0, 0, 0, 0.2)`;
      
        // Pop-out 3D effect for the card title
        if (cardTitle) {
            const titleX = ((x - centerX) / centerX) * 10;
            const titleY = ((y - centerY) / centerY) * 10;
            cardTitle.style.transform = `translateZ(30px) rotateX(${-titleY}deg) rotateY(${titleX}deg)`;
        }
    });

    // Reset effect when the mouse leaves the card
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
        
        if (cardTitle) {
            cardTitle.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        }
    });
});



