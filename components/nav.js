;(function () {
    console.log("components/nav.js loaded")

    class NavBar extends HTMLElement {
        connectedCallback() {
            if (this._rendered) return

            this.innerHTML = `
              <header class="site-header">
                <a id="logo-link" class="logo-container" href="index.html" aria-label="Home">
                  <img src="images/beacon-logo.svg" alt="Beacon Logo" class="site-logo" />
                </a>

                <nav aria-label="Primary Navigation">
                  <ul class="site-nav">
                    <li><a href="about.html">About / Team</a></li>
                    <li><a href="partners.html">Partners</a></li>
                    <li><a href="patient-stories.html">Patient Advocacy</a></li>
                    <li><a href="resources.html">Resources & Research</a></li>
                    <li><a href="clinical.html">Clinical Library</a></li>
                    <!-- <li><a href="phase2.html">Phase 2</a></li> -->
                  </ul>
                </nav>

                <div class="site-actions">
                  <button class="nav-contact" type="button" aria-label="Contact">Contact Us</button>
                </div>
              </header>
            `

            // Highlight current page links
            const anchors = this.querySelectorAll("a")
            anchors.forEach((a) => {
                try {
                    const url = new URL(a.href)
                    const seg = url.pathname.split("/").pop()
                    const current =
                        location.pathname.split("/").pop() || "index.html"
                    if (seg === current) a.classList.add("active")
                } catch (e) {
                    const href = a.getAttribute("href")
                    if (href && location.href.endsWith(href))
                        a.classList.add("active")
                }
            })

            // Contact button behaviour & active state
            const contactBtn = this.querySelector(".nav-contact")
            if (contactBtn) {
                contactBtn.addEventListener("click", () => {
                    location.href = "contact.html"
                })
                const current =
                    location.pathname.split("/").pop() || "index.html"
                if (current === "contact.html") {
                    contactBtn.classList.add("active")
                    contactBtn.setAttribute("aria-current", "page")
                }
            }

            this._rendered = true
        }
    }

    // Register element (or provide fallback injection for older browsers)
    if (
        window.customElements &&
        typeof window.customElements.define === "function"
    ) {
        if (!customElements.get("nav-bar"))
            customElements.define("nav-bar", NavBar)
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll("nav-bar").forEach((el) => {
                el.innerHTML = `
              <header class="site-header">
                <a id="logo-link" class="logo-container" href="index.html" aria-label="Home">
                  <img src="images/beacon-logo.svg" alt="Beacon Logo" class="site-logo" />
                </a>
                <nav aria-label="Primary Navigation">
                  <ul class="site-nav">
                    <li><a href="about.html">About / Team</a></li>
                    <li><a href="partners.html">Partners</a></li>
                    <li><a href="patient-stories.html">Patient Advocacy</a></li>
                    <li><a href="resources.html">Resources & Research</a></li>
                    <li><a href="clinical.html">Clinical Library</a></li>
                    <li><a href="phase2.html">Phase 2</a></li>
                  </ul>
                </nav>
                <div class="site-actions">
                  <button class="nav-contact" type="button" aria-label="Contact">Contact</button>
                </div>
              </header>
            `

                const btn = el.querySelector(".nav-contact")
                if (btn) {
                    btn.addEventListener(
                        "click",
                        () => (location.href = "contact.html")
                    )
                    const current =
                        location.pathname.split("/").pop() || "index.html"
                    if (current === "contact.html") {
                        btn.classList.add("active")
                        btn.setAttribute("aria-current", "page")
                    }
                }
            })
        })
    }
})()
