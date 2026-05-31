(() => {
  const cfg = window.SITE_CONFIG || {};

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const siteNames = document.querySelectorAll("[data-site-name]");
  const siteTags = document.querySelectorAll("[data-site-tag], [data-site-tag-hero], [data-site-tag-footer]");
  const emailAnchors = document.querySelectorAll("[data-email]");
  const linkedIn = document.querySelector("[data-linkedin]");
  const github = document.querySelector("[data-github]");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("[data-brief-form]");
  const hint = document.querySelector("[data-form-hint]");
  const trustLine = document.querySelector("[data-trust-line]");
  const statsRoot = document.querySelector("[data-stats]");
  const ogUrl = document.querySelector("[data-og-url]");
  const canonical = document.querySelector("[data-canonical]");
  const ldScript = document.querySelector('script[type="application/ld+json"]');
  const phoneRow = document.querySelector("[data-phone-row]");
  const phoneLink = document.querySelector("[data-phone-link]");
  const panelChannels = document.querySelector("[data-panel-channels]");
  const calendlyWrap = document.querySelector("[data-calendly-wrap]");
  const calendlyPrimary = document.querySelector("[data-calendly-primary]");
  const calendlyInline = document.querySelector("[data-calendly-inline]");
  const ctaLineCalendar = document.querySelector("[data-cta-line-calendar]");
  const ctaDirect = document.querySelector("[data-cta-direct]");
  const portfolioTabs = document.querySelector("[data-portfolio-tabs]");
  const portfolioGrid = document.querySelector("[data-portfolio-grid]");

  const isHttpUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v.trim());

  const setMetaUrl = (url) => {
    if (!url || !isHttpUrl(url)) return;
    if (ogUrl) ogUrl.setAttribute("content", url.trim());
    if (canonical) canonical.setAttribute("href", url.trim());
  };

  const updateJsonLd = (url) => {
    if (!ldScript || !url || !isHttpUrl(url)) return;
    try {
      const data = JSON.parse(ldScript.textContent || "{}");
      data.url = url.trim();
      if (cfg.brandName) data.name = cfg.brandName;
      if (cfg.email) {
        data.provider = {
          "@type": "Person",
          name: cfg.brandName || "Geliştirici",
          email: cfg.email,
        };
      }
      ldScript.textContent = JSON.stringify(data, null, 2);
    } catch {
      /* yoksay */
    }
  };

  if (cfg.brandName) {
    siteNames.forEach((el) => {
      el.textContent = cfg.brandName;
    });
    document.title = `${cfg.brandName} — Mobil, web, AI ve veri`;
  }

  if (cfg.tagline) {
    siteTags.forEach((el) => {
      if (el.hasAttribute("data-site-tag-hero")) {
        el.textContent = `${cfg.tagline} · Uzaktan`;
      } else if (el.hasAttribute("data-site-tag-footer")) {
        el.textContent = `${cfg.tagline} · Uzaktan · Türkiye`;
      } else {
        el.textContent = cfg.tagline;
      }
    });
  }

  if (cfg.email) {
    emailAnchors.forEach((a) => {
      a.textContent = cfg.email;
      a.href = `mailto:${cfg.email}`;
    });
  }

  if (linkedIn) {
    if (isHttpUrl(cfg.linkedInUrl)) {
      linkedIn.href = cfg.linkedInUrl.trim();
      linkedIn.textContent = "LinkedIn";
      linkedIn.rel = "noopener noreferrer";
      linkedIn.hidden = false;
    } else {
      linkedIn.hidden = true;
    }
  }

  if (github) {
    if (isHttpUrl(cfg.githubUrl)) {
      github.href = cfg.githubUrl.trim();
      github.textContent = "GitHub";
      github.rel = "noopener noreferrer";
      github.hidden = false;
    } else {
      github.hidden = true;
    }
  }

  setMetaUrl(cfg.siteUrl);
  updateJsonLd(cfg.siteUrl);

  if (cfg.phoneTel && cfg.phoneDisplay && phoneRow && phoneLink) {
    phoneRow.hidden = false;
    phoneLink.href = `tel:${String(cfg.phoneTel).replace(/\s/g, "")}`;
    phoneLink.textContent = cfg.phoneDisplay;
  }

  if (isHttpUrl(cfg.calendlyUrl)) {
    const u = cfg.calendlyUrl.trim();
    if (calendlyWrap && calendlyPrimary) {
      calendlyWrap.hidden = false;
      calendlyPrimary.href = u;
    }
    if (calendlyInline) calendlyInline.href = u;
    if (ctaLineCalendar) ctaLineCalendar.hidden = false;
    if (panelChannels) {
      panelChannels.textContent = "";
      const a = document.createElement("a");
      a.className = "btn btn--ghost btn--small";
      a.href = u;
      a.rel = "noopener noreferrer";
      a.textContent = "Takvim: 20 dk. görüşme";
      panelChannels.appendChild(a);
    }
  } else if (panelChannels) {
    panelChannels.textContent = "";
  }

  if (ctaDirect && cfg.email) {
    ctaDirect.textContent =
      `Birincil kanal: ${cfg.email}` + (cfg.phoneDisplay ? ` · Telefon: ${cfg.phoneDisplay}` : "");
    ctaDirect.hidden = false;
  }

  if (year) year.textContent = String(new Date().getFullYear());

  if (trustLine && cfg.trustLine) trustLine.textContent = cfg.trustLine;

  if (statsRoot && Array.isArray(cfg.stats) && cfg.stats.length) {
    statsRoot.innerHTML = cfg.stats
      .map(
        (s) => `
        <div class="stat">
          <p class="stat__value">${s.value}</p>
          <p class="stat__label">${s.label}</p>
        </div>`,
      )
      .join("");
  }

  const setPortfolioFilter = (filter) => {
    if (!portfolioGrid) return;
    const cards = portfolioGrid.querySelectorAll("[data-category]");
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const show = filter === "all" || cat === filter;
      card.classList.toggle("is-hidden", !show);
    });
    if (portfolioTabs) {
      portfolioTabs.querySelectorAll("[data-filter]").forEach((btn) => {
        const active = btn.getAttribute("data-filter") === filter;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }
  };

  if (portfolioTabs) {
    portfolioTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      setPortfolioFilter(btn.getAttribute("data-filter") || "all");
    });
  }

  document.querySelectorAll("[data-portfolio-filter]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const filter = link.getAttribute("data-portfolio-filter");
      if (!filter) return;
      e.preventDefault();
      setPortfolioFilter(filter);
      const portfoy = document.getElementById("portfoy");
      if (portfoy) portfoy.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => closeNav()));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY > 24;
        header.dataset.scrolled = scrolled ? "true" : "false";
        header.classList.toggle("header--light", scrolled);
      },
      { passive: true },
    );
  }

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const company = String(data.get("company") || "").trim();
      const email = String(data.get("email") || "").trim();
      const summary = String(data.get("summary") || "").trim();
      const budget = String(data.get("budget") || "").trim();
      const start = String(data.get("start") || "").trim();
      const serviceArea = String(data.get("serviceArea") || "").trim();

      const subject = `Proje talebi — ${name}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Gönderiliyor…";
      }
      if (hint) hint.textContent = "";

      const done = () => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Gönder";
        }
      };

      try {
        let ok = false;

        if (cfg.formAccessKey) {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: cfg.formAccessKey,
              subject,
              from_name: name,
              email,
              message: summary,
              company: company || "—",
              service_area: serviceArea,
              budget,
              start,
            }),
          });
          const result = await res.json();
          ok = Boolean(result.success);
        } else if (cfg.email) {
          const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(cfg.email)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              _subject: subject,
              _template: "table",
              _captcha: "false",
              name,
              email,
              company: company || "—",
              service_area: serviceArea,
              budget,
              start,
              message: summary,
            }),
          });
          ok = res.ok;
        }

        if (!ok) throw new Error("Gönderilemedi");

        form.reset();
        if (hint) {
          hint.textContent = "Talebiniz alındı. İş günü içinde dönüş yapılacaktır.";
        }
      } catch {
        if (hint) {
          hint.textContent =
            "Gönderim başarısız. Lütfen doğrudan e-posta veya telefon ile ulaşın.";
        }
      } finally {
        done();
      }
    });
  }
})();
