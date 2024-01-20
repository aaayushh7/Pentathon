// Slider Functionality
const slider = document.querySelector('.slider');

function activateSlider(e) {
  const items = document.querySelectorAll('.item');
  if (e.target.matches('.next')) {
    slider.append(items[0]);
  } else if (e.target.matches('.prev')) {
    slider.prepend(items[items.length - 1]);
  }
}

document.addEventListener('click', activateSlider, false);

// Scroll to Main Section
document.addEventListener("DOMContentLoaded", function() {
  const registerButton = document.getElementById("registerBtn");
  const mainSection = document.getElementById("mainSection");

  function scrollToMainSection() {
    mainSection.scrollIntoView({ behavior: "smooth" });
  }

  registerButton.addEventListener("click", scrollToMainSection);
});

// DJ Page Popup
document.addEventListener('DOMContentLoaded', function () {
  var popup = document.getElementById('popup');
  var closeBtn = document.getElementById('close');
  var giftIcon = document.getElementById('giftIcon');
  var popupVideo = document.getElementById('popupVideo');

  function isDesktop() {
      return window.innerWidth > 768;
  }

  function showPopup() {
      popup.style.display = 'flex';

      if (isDesktop()) {
          popupVideo.play();
      }
  }

  function hidePopup() {
      popup.style.display = 'none';

      if (isDesktop()) {
          popupVideo.pause();
      }
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

// Scroll to About Event Section
document.addEventListener("DOMContentLoaded", function() {
  const aboutEventButton = document.querySelector(".custom-button1");
  const aboutEventSection = document.querySelector(".body");

  function scrollToAboutEventSection() {
    aboutEventSection.scrollIntoView({ behavior: "smooth" });
  }

  aboutEventButton.addEventListener("click", scrollToAboutEventSection);
});
