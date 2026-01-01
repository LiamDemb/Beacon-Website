;(function () {
    console.log("components/footer.js loaded")

    class SiteFooter extends HTMLElement {
        connectedCallback() {
            if (this._rendered) return
            this.innerHTML = `
          <footer class="site-footer" role="contentinfo" aria-label="Site Footer">
          <div class="site-footer-grid">
            <div class="footer-column footer-about">
              <h3>Proton Radiation Centre</h3>
              <p>
                Beacon Proton Therapy Centre — advancing cancer care through
                precision proton therapy.<br />123 Health St, Perth, WA
              </p>
            </div>

            <div class="footer-column footer-links">
              <h4>Quick Links</h4>
              <ul class="footer-links-list">
                <li><a href="about.html">About</a></li>
                <li><a href="clinical.html">Clinical Library</a></li>
                <li><a href="resources.html">Resources & Research</a></li>
                <li><a href="patient-stories.html">Patient Advocacy</a></li>
              </ul>
            </div>

            <div class="footer-column footer-contact">
              <h4>Contact</h4>
              <address>
                <a href="mailto:info@beacon.example">info@beacon.example</a><br />
                Phone: +61 8 9000 0000
              </address>
            </div>

            <div class="footer-column footer-social">
              <h4>Connect</h4>
              <ul class="social-list">
                <li><a href="#" aria-label="Follow on Twitter">Twitter</a></li>
                <li><a href="#" aria-label="Follow on LinkedIn">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-note">&copy; ${new Date().getFullYear()} Proton Radiation Centre Western Australia — Wireframe v1.0 — <a href="privacy.html">Privacy</a> — <a href="terms.html">Terms</a></p>
          </div>
        </footer>
      `
            this._rendered = true
        }
    }

    if (
        window.customElements &&
        typeof window.customElements.define === "function"
    ) {
        if (!customElements.get("site-footer"))
            customElements.define("site-footer", SiteFooter)
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll("site-footer").forEach((el) => {
                el.innerHTML = `
                  <footer class="site-footer" role="contentinfo" aria-label="Site Footer">
            <div class="site-footer-grid">
              <div class="footer-column footer-about">
                <h3>Proton Radiation Centre</h3>
                <p>
                  Beacon Proton Therapy Centre — advancing cancer care
                  through precision proton therapy.<br />123 Health St,
                  Perth, WA
                </p>
              </div>

              <div class="footer-column footer-links">
                <h4>Quick Links</h4>
                <ul class="footer-links-list">
                  <li><a href="about.html">About</a></li>
                  <li><a href="clinical.html">Clinical Library</a></li>
                  <li><a href="resources.html">Resources & Research</a></li>
                  <li><a href="patient-stories.html">Patient Advocacy</a></li>
                </ul>
              </div>

              <div class="footer-column footer-contact">
                <h4>Contact</h4>
                <address>
                  <a href="mailto:info@beacon.example">info@beacon.example</a><br />
                  Phone: +61 8 9000 0000
                </address>
              </div>

              <div class="footer-column footer-social">
                <h4>Connect</h4>
                <ul class="social-list">
                  <li><a href="#" aria-label="Follow on Twitter">Twitter</a></li>
                  <li><a href="#" aria-label="Follow on LinkedIn">LinkedIn</a></li>
                </ul>
              </div>
            </div>

            <div class="footer-bottom">
              <p class="footer-note">&copy; ${new Date().getFullYear()} Proton Radiation Centre Western Australia — Wireframe v1.0 — <a href="privacy.html">Privacy</a> — <a href="terms.html">Terms</a></p>
            </div>
          </footer>
        `
            })
        })
    }
})()
