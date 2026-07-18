document.getElementById("logoGreen").addEventListener(
  "click",
  function () {
    document.getElementById("logoRed").checked = false;
  },
  false,
);
document.getElementById("logoRed").addEventListener(
  "click",
  function () {
    document.getElementById("logoGreen").checked = false;
  },
  false,
);
