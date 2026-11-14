const bombImg = document.getElementById("Bomb_img");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const explosionSfx = document.getElementById("audio");
const wowSfx = document.getElementById("wow");

const IMAGES = {
  safe: "audios and images/bomb.png",
  ignited: "audios and images/boom.png",
  detonated: "audios and images/wow.png"
};

const FUSE_TIME = 2000;

let state = "safe";
let fuseTimer = null;

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

function render() {
  bombImg.src = IMAGES[state];
  bombImg.className = "state-" + state;

  statusEl.className = "status " + state;

  if (state === "safe") {
    statusEl.textContent = "SAFE";
    btn.textContent = "IGNITE";
    btn.setAttribute("aria-label", "Ignite");
  } else if (state === "ignited") {
    statusEl.textContent = "IGNITED";
    btn.textContent = "DEFUSE";
    btn.setAttribute("aria-label", "Defuse");
  } else {
    statusEl.textContent = "DETONATED";
    btn.textContent = "RESET";
    btn.setAttribute("aria-label", "Reset");
  }
}

function ignite() {
  state = "ignited";
  render();
  playSound(explosionSfx);
  fuseTimer = setTimeout(detonate, FUSE_TIME);
}

function detonate() {
  fuseTimer = null;
  state = "detonated";
  render();
  playSound(wowSfx);
}

function reset() {
  clearTimeout(fuseTimer);
  fuseTimer = null;
  stopSound(explosionSfx);
  stopSound(wowSfx);
  state = "safe";
  render();
}

btn.addEventListener("click", () => {
  if (state === "safe") {
    ignite();
  } else {
    reset();
  }
});

render();