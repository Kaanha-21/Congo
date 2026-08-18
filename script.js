(() => {
  // GIFT CARD SETUP: paste the full https:// link between these quotes when it is ready.
  const GIFT_CARD_URL = "https://youtu.be/QDia3e12czc?si=2pnKVzZ-1lIBgBGD";
  const purple = document.querySelector(".art-purple");
  const meter = document.querySelector("#meter");
  const ambient = document.querySelector("#ambient");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doodles = [...document.querySelectorAll("[data-doodle]")];
  let lastMilestone = -1;
  const colors = ["#fff3c4", "#f6a6a6", "#9e75ba", "#f5d07c", "#ffffff"];
  function addBurst(x = Math.random() * 100, y = 15) {
    if (reduced) return;
    for (let i = 0; i < 14; i++) {
      const el = document.createElement("i");
      el.className = "confetti";
      el.style.left = `${x + (Math.random() - 0.5) * 14}%`;
      el.style.top = `${y + (Math.random() - 0.5) * 6}%`;
      el.style.background = colors[i % colors.length];
      el.style.animationDuration = `${2.8 + Math.random() * 2}s`;
      el.style.animationDelay = `${Math.random() * 0.3}s`;
      ambient.append(el);
      setTimeout(() => el.remove(), 6000);
    }
  }
  function decorate() {
    if (reduced) return;
    [
      [8, 24, "#f5bf74"],
      [88, 31, "#9c6fc1"],
      [93, 72, "#f39da9"],
      [14, 80, "#b77cbb"],
    ].forEach(([x, y, c], i) => {
      const b = document.createElement("i");
      b.className = "balloon";
      b.style.left = x + "%";
      b.style.top = y + "%";
      b.style.background = c;
      b.style.animationDelay = -i * 2.2 + "s";
      ambient.append(b);
    });
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("i");
      s.className = "spark";
      s.textContent = "✦";
      s.style.left = 8 + Math.random() * 84 + "%";
      s.style.top = 8 + Math.random() * 85 + "%";
      s.style.animationDelay = -Math.random() * 3 + "s";
      ambient.append(s);
    }
    addBurst(9, 18);
    setTimeout(() => addBurst(91, 46), 1800);
  }
  function updateDoodles(progress) {
    doodles.forEach((doodle) => {
      const from = Number(doodle.dataset.from);
      const to = Number(doodle.dataset.to);
      const drift = Number(doodle.dataset.drift || 0);
      const fade = 0.14;
      const visible = Math.max(
        0,
        Math.min(1, (progress - from) / fade, (to - progress) / fade),
      );
      const baseOpacity = doodle.classList.contains("doodle--distant")
        ? 0.32
        : 0.8;
      doodle.style.setProperty(
        "--doodle-visibility",
        (visible * baseOpacity).toFixed(3),
      );
      doodle.style.setProperty(
        "--scroll-shift",
        reduced ? "0px" : `${((progress - 0.5) * drift).toFixed(2)}vh`,
      );
    });
  }
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    purple.style.opacity = p;
    meter.style.width = p * 100 + "%";
    updateDoodles(p);
    const milestone = Math.floor(p * 4);
    if (milestone !== lastMilestone) {
      lastMilestone = milestone;
      if (milestone > 0) addBurst(milestone % 2 ? 88 : 12, 18 + milestone * 18);
    }
  }
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  decorate();
  update();
  document.querySelector("#wishButton").addEventListener("click", () => {
    addBurst(50, 70);
    document.querySelector("#wishMessage").textContent = "Wish sent. ✦";
  });
  const giftCard = document.querySelector("[data-gift-card]");
  const giftLink = document.querySelector("#giftCardLink");
  const giftLinkHint = document.querySelector("#giftLinkHint");
  function configureGiftLink() {
    const url = GIFT_CARD_URL.trim();
    let isSafeGiftUrl = false;
    try {
      const parsed = new URL(url);
      isSafeGiftUrl =
        parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (_) {
      /* Keep the card inactive until a complete URL is supplied. */
    }
    if (isSafeGiftUrl) {
      giftLink.href = url;
      giftLink.target = "_blank";
      giftLink.rel = "noopener noreferrer";
      giftLink.setAttribute("aria-disabled", "false");
      giftLink.removeAttribute("title");
      giftLinkHint.textContent = "A birthday surprise is ready for you.";
    }
  }
  configureGiftLink();
  if ("IntersectionObserver" in window) {
    const giftObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22 },
    );
    giftObserver.observe(giftCard);
  } else {
    giftCard.classList.add("is-visible");
  }
})();
