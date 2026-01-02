;(function () {
    console.log("components/nav.js loaded")

    class NavBar extends HTMLElement {
        connectedCallback() {
            if (this._rendered) return

            this.innerHTML = `
              <header class="site-header site-header--stacked">
                <div class="top-bar">
                  <div class="top-bar__inner">
                    <ul class="top-bar__links">
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="#">Foundation</a></li>
                      <li><a href="#">EN</a></li>
                    </ul>
                  </div>
                </div>

                <div class="brand-row">
                  <a id="logo-link" class="logo-container logo-container--large" href="index.html" aria-label="Home">
                    <img src="images/beacon-logo-new.svg" alt="Beacon Logo" class="site-logo site-logo--large" />
                  </a>

                  <nav aria-label="Primary Navigation" class="primary-nav">
                    <ul class="site-nav">
                      <li><a href="about.html">About</a></li>
                      <li><a href="partners.html">Partners</a></li>
                      <li><a href="patient-stories.html">Patient Advocacy</a></li>
                      <li><a href="resources.html">Resources</a></li>
                      <li><a href="clinical.html">Clinical</a></li>
                    </ul>
                  </nav>
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

            // No dedicated contact button in stacked layout; top-bar links above

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
              <header class="site-header site-header--stacked">
                <div class="top-bar">
                  <div class="top-bar__inner">
                    <ul class="top-bar__links">
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="#">Foundation</a></li>
                      <li><a href="#">EN</a></li>
                    </ul>
                  </div>
                </div>

                <div class="brand-row">
                  <a id="logo-link" class="logo-container logo-container--large" href="index.html" aria-label="Home">
                    <img src="images/beacon-logo-new.svg" alt="Beacon Logo" class="site-logo site-logo--large" />
                  </a>

                  <nav aria-label="Primary Navigation" class="primary-nav">
                    <ul class="site-nav">
                      <li><a href="about.html">About</a></li>
                      <li><a href="partners.html">Partners</a></li>
                      <li><a href="patient-stories.html">Patient Advocacy</a></li>
                      <li><a href="resources.html">Resources</a></li>
                      <li><a href="clinical.html">Clinical</a></li>
                    </ul>
                  </nav>
                </div>
              </header>
            `

                // highlight active anchors in fallback copy
                const anchors = el.querySelectorAll("a")
                anchors.forEach((a) => {
                    const href = a.getAttribute("href")
                    if (href && location.href.endsWith(href))
                        a.classList.add("active")
                })
            })
        })
    }
})()
