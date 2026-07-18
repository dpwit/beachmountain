document.getElementById("eyesGreen").addEventListener(
  "click",
  function () {
    document.getElementById("eyesBlue").checked = false;
    document.getElementById("eyesGrey").checked = false;
  },
  false,
);
document.getElementById("eyesBlue").addEventListener(
  "click",
  function () {
    document.getElementById("eyesGreen").checked = false;
    document.getElementById("eyesGrey").checked = false;
  },
  false,
);
document.getElementById("eyesGrey").addEventListener(
  "click",
  function () {
    document.getElementById("eyesGreen").checked = false;
    document.getElementById("eyesBlue").checked = false;
  },
  false,
);
