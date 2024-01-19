// slider

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click', activate, false);


// register scroll

  document.addEventListener("DOMContentLoaded", function() {
    var registerButton = document.getElementById("registerBtn");

    var mainSection = document.getElementById("mainSection");

    registerButton.addEventListener("click", function() {
      mainSection.scrollIntoView({ behavior: "smooth" });
    });
  });


// dj page

  document.addEventListener('DOMContentLoaded', function () {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('close');
    var giftIcon = document.getElementById('giftIcon');
    var popupVideo = document.getElementById('popupVideo');


    function showPopup() {
        popup.style.display = 'flex';

        popupVideo.play();
    }

    function hidePopup() {
        popup.style.display = 'none';

        popupVideo.pause();
    }

    giftIcon.addEventListener('click', showPopup);
    giftIcon.addEventListener('touchstart', showPopup);

    closeBtn.addEventListener('click', hidePopup);

    window.addEventListener('click', function (event) {
        if (event.target == popup) {
            hidePopup();
        }
    });
});


// about scroll


  document.addEventListener("DOMContentLoaded", function() {
    var aboutEventButton = document.querySelector(".custom-button1");

    var aboutEventSection = document.querySelector(".section-1");

    aboutEventButton.addEventListener("click", function() {
      aboutEventSection.scrollIntoView({ behavior: "smooth" });
    });
  });


