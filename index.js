const clock = document.querySelector("#clock");
const status = document.querySelector("#status");
const toggle = document.querySelector("#toggle");
const reset = document.querySelector("#reset");
const sessionLength = 25 * 60;
let remaining = sessionLength;
let interval;

function render() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  clock.textContent = `${minutes}:${seconds}`;
  clock.setAttribute("aria-label", `${minutes} minutes ${seconds} seconds`);
}

toggle.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = undefined;
    toggle.textContent = "Resume focus";
    status.textContent = "Paused. Pick up whenever you're ready.";
    return;
  }
  toggle.textContent = "Pause";
  status.textContent = "You're doing great. Stay with it.";
  interval = setInterval(() => {
    remaining -= 1;
    render();
    if (remaining === 0) {
      clearInterval(interval);
      interval = undefined;
      toggle.textContent = "Start again";
      status.textContent = "Session complete. Nice work!";
    }
  }, 1000);
});

reset.addEventListener("click", () => {
  clearInterval(interval);
  interval = undefined;
  remaining = sessionLength;
  render();
  toggle.textContent = "Start focus";
  status.textContent = "Ready when you are.";
});