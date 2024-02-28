const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const carousel = $("#carousel");
const slider = $(".slider");
const imgs = $$("#carousel img");
const icons = $(".icons");
const backRightBtn = $(".buttonChange .right");
const backLeftBtn = $(".buttonChange .left");

let interValFun;
let currentIndex = 0;

// gán chiều rộng cho slide khớp với chiều rộng img

const app = {
  handleEvent: function () {
    _this = this;

    interValFun = setInterval(_this.autoChangeSlide, 1000);

    // Khi click vào icons để thay đổi hình ảnh

    icons.onclick = function (e) {
      clearInterval(interValFun);

      let targetElement = e.target.closest(".icon");
      currentIndex = Number(targetElement.getAttribute("data-index"));
      _this.changeSlide();
    };

    // Khi bấm vào lùi hình ảnh

    backLeftBtn.onclick = function () {
      clearInterval(interValFun);
      currentIndex = currentIndex - 1;
      if (currentIndex < 0) {
        currentIndex = imgs.length - 1;
      }
      _this.changeSlide();
    };

    // Khi bấm vào tiến hình ảnh

    backRightBtn.onclick = function () {
      clearInterval(interValFun);
      currentIndex++;
      if (currentIndex == imgs.length) {
        currentIndex = 0;
      }
      _this.changeSlide();
    };
  },

  renderIcons: function () {
    const htmls = Array.from(imgs).map((img, index) => {
      return `<div class="icon  ${
        index == currentIndex ? "active" : ""
      }  " data-index = '${index}'></div>`;
    });
    icons.innerHTML = htmls.join("");
  },
  setWidth: function () {
    carousel.style.width = imgs[currentIndex].offsetWidth + "px";
  },

  changeSlide: function () {
    this.renderIcons();
    slider.style.transform = `translateX(${currentIndex * -100}%)`;
  },

  autoChangeSlide: function () {
    _this.changeSlide();

    currentIndex++;
    if (currentIndex == imgs.length) {
      currentIndex = 0;
    }
  },

  start: function () {
    this.setWidth();
    this.renderIcons();

    this.handleEvent();
  },
};
app.start();
