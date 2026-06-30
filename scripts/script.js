"use strict";

const container = document.querySelector("#container");

let parallaxIntensity = 1;
let parallaxStrength = 1;
let parallaxDistance = 90;
let parallaxDamp = 0.07;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

let imgElement = null;
let currentImage = null;

function getExtension(filePath) {
  return (
    filePath
      .substring(filePath.lastIndexOf(".") + 1, filePath.length)
      .toLowerCase() || filePath
  );
}

function livelyPropertyListener(name, val) {
  switch (name) {
    case "parallaxIntensity":
      parallaxIntensity = val;
      break;

    case "parallaxStrength":
      parallaxStrength = val;
      break;

    case "parallaxDistance":
      parallaxDistance = val;
      break;

    case "parallaxDamp":
      parallaxDamp = val;
      break;

    case "imgFit":
      const imgFitArray = ["fill", "cover", "contain", "none", "scale-down"];
      let imgFit = imgFitArray[val];

      if (imgElement) imgElement.style.objectFit = imgFit;
      break;

    case "imgSelect":
      const extension = getExtension(val);

      if (
        extension !== "jpg" &&
        extension !== "jpeg" &&
        extension !== "png" &&
        extension !== "webp"
      )
        return;

      const tempImg = new Image();

      tempImg.onload = () => {
        if (!imgElement) {
          imgElement = document.createElement("img");
          imgElement.style.width = "100%";
          imgElement.style.height = "100%";
          imgElement.style.objectFit = "cover";
        }

        imgElement.src = val;

        if (!imgElement.isConnected) container.replaceChildren(imgElement);
      };

      tempImg.src = val;

      break;
  }
}

document.addEventListener("mousemove", function (event) {
  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;

  targetX = (x * parallaxIntensity * parallaxStrength) / parallaxDistance;
  targetY = (y * parallaxIntensity * parallaxStrength) / parallaxDistance;
});

function animateParallax() {
  const dx = targetX - currentX;
  const dy = targetY - currentY;

  const speed = Math.hypot(dx, dy);
  const damp = Math.min(0.35, parallaxDamp + speed * 0.012);

  currentX += dx * damp;
  currentY += dy * damp;

  container.style.transform = `translateX(${currentX}px) translateY(${currentY}px) scale(1.06)`;

  requestAnimationFrame(animateParallax);
}

animateParallax();
