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
let resolution = { width: 0, height: 0 };

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

    case "imgSelect":
      {
        const extension = getExtension(val);

        if (
          extension == "jpg" ||
          extension == "jpeg" ||
          extension == "png" ||
          extension == "webp"
        ) {
          if (!imgElement) {
            imgElement = document.createElement("img");
            container.innerHTML = "";
            container.appendChild(imgElement);

            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover";
          }

          const tempImg = new Image();

          tempImg.onload = () => {
            resolution = {
              width: tempImg.width,
              height: tempImg.height,
            };

            imgElement.src = val;
          };

          tempImg.src = val;
        }
      }
      break;
  }
}

document.addEventListener("mousemove", function (event) {
  targetX =
    (window.innerWidth - event.pageX * parallaxIntensity * parallaxStrength) /
    parallaxDistance;

  targetY =
    (window.innerHeight - event.pageY * parallaxIntensity * parallaxStrength) /
    parallaxDistance;
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
