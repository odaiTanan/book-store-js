//home page book transition
let pre = document.getElementById("prev");
let next = document.getElementById("next");
let le = document.querySelectorAll(".page");
let i = 0;
let j = 3;
function o() {
  i = 0;
  let i1 = setInterval(() => {
    if (i < 3) {
      le[i].style.transform = "rotateY(-180deg)";
      le[i].style.zIndex = "100";
    } else {
      clearInterval(setI);
      clearInterval(i1);
      let r = 0;
      let res=setInterval(() => {
        if (i > 0) {
          le[i - 1].style.transform = "rotateY(0deg)";
          le.forEach((pa) => {
            pa.style.zIndex = pa.attributes.i.value;
          });
          le[i - 1].style.zIndex = "100";
          i--;
          r++;
          if (r == 3) {
              clearInterval(res);
            o();
            
          }
        }
      }, 2500);
    }
  }, 2500);

  let setI = setInterval(() => {
    i++;
  }, 2500);
}
o();
