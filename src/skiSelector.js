document.getElementById("cartoon").addEventListener(
  "click",
  function () {
    document.getElementById("side").checked = false;
    document.getElementById("ski").checked = false;
  },
  false,
);
document.getElementById("side").addEventListener(
  "click",
  function () {
    document.getElementById("cartoon").checked = false;
    document.getElementById("ski").checked = false;
  },
  false,
);
document.getElementById("ski").addEventListener(
  "click",
  function () {
    document.getElementById("cartoon").checked = false;
    document.getElementById("side").checked = false;
  },
  false,
);
