/* Central Electrics & Security — site scripts */

/* ===== GOOGLE REVIEWS SETTINGS =====
   PLACE_ID is your Google Business listing (already filled in).
   To show live reviews on the site, paste a Google Maps API key
   (with "Places API (New)" enabled, restricted to your domain) below.
   Without a key, the section still shows the "Leave a review" and
   "Read our reviews" buttons. */
const GOOGLE_PLACE_ID = "ChIJi2XwCVb2eUgR8YL2YHHdaZI";
const GOOGLE_API_KEY  = "";   // e.g. "AIzaSy..."

const WRITE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=" + GOOGLE_PLACE_ID;
const READ_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=" + GOOGLE_PLACE_ID;

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile menu */
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  /* Review links */
  document.querySelectorAll("[data-write-review]").forEach(a => { a.href = WRITE_REVIEW_URL; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-read-reviews]").forEach(a => { a.href = READ_REVIEWS_URL; a.target = "_blank"; a.rel = "noopener"; });

  /* Showcase reel arrows */
  document.querySelectorAll(".reel-wrap").forEach(w => {
    const reel = w.querySelector(".reel");
    const step = () => reel.clientWidth * 0.8;
    w.querySelector("[data-prev]")?.addEventListener("click", () => reel.scrollBy({ left: -step(), behavior: "smooth" }));
    w.querySelector("[data-next]")?.addEventListener("click", () => reel.scrollBy({ left: step(), behavior: "smooth" }));
  });

  /* Reveal on scroll */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  /* Hero collage: crossfade each tile, staggered so they change one at a time.
     Only fades to a photo once it has fully loaded, so a slow connection
     never shows an empty tile. */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const ready = img => img.complete && img.naturalWidth > 0;
    document.querySelectorAll(".collage .slides").forEach((tile, n) => {
      const imgs = [...tile.querySelectorAll("img")];
      if (imgs.length < 2) return;
      let i = 0;
      const step = () => {
        for (let k = 1; k < imgs.length; k++) {
          const j = (i + k) % imgs.length;
          if (ready(imgs[j])) {
            imgs[i].classList.remove("on");
            imgs[j].classList.add("on");
            i = j;
            return;
          }
        }
      };
      setTimeout(() => setInterval(step, 6000), 1500 * n + 3000);
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* Live Google reviews (only if an API key is set) */
  if (GOOGLE_API_KEY && document.getElementById("google-reviews")) loadGoogleReviews();
});

function loadGoogleReviews() {
  window.__initReviews = async () => {
    try {
      const { Place } = await google.maps.importLibrary("places");
      const place = new Place({ id: GOOGLE_PLACE_ID });
      await place.fetchFields({ fields: ["rating", "userRatingCount", "reviews"] });
      renderReviews(place);
    } catch (e) { console.warn("Reviews could not load", e); }
  };
  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=weekly&loading=async&callback=__initReviews`;
  s.async = true;
  document.head.appendChild(s);
}

function stars(n) { const r = Math.round(n || 0); return "★★★★★".slice(0, r) + "☆☆☆☆☆".slice(0, 5 - r); }
function esc(t) { const d = document.createElement("div"); d.textContent = t || ""; return d.innerHTML; }

function renderReviews(place) {
  if (place.rating) {
    document.getElementById("g-stars").textContent = stars(place.rating);
    document.getElementById("g-count").textContent = `Rated ${place.rating.toFixed(1)} out of 5 · ${place.userRatingCount} reviews`;
  }
  const grid = document.getElementById("google-reviews");
  const list = (place.reviews || []).filter(r => r.text).slice(0, 3);
  if (!list.length) return;
  document.getElementById("google-block").hidden = false;
  grid.innerHTML = list.map(r => {
    const a = r.authorAttribution || {};
    return `<article class="review">
      <div class="stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
      <p>${esc(r.text)}</p>
      <div class="who">${a.photoURI ? `<img src="${a.photoURI}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ""}
        <div><b>${a.uri ? `<a href="${a.uri}" target="_blank" rel="noopener">${esc(a.displayName)}</a>` : esc(a.displayName)}</b>
        <small>${esc(r.relativePublishTimeDescription)}</small></div></div>
      <div class="src">Posted on Google</div>
    </article>`;
  }).join("");
}
