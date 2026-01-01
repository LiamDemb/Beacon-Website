;(function () {
    console.log("components/clinical.js loaded")

    function initClinicalAccordion(root = document) {
        const accordions = root.querySelectorAll(".clinical-accordion")
        accordions.forEach((accordion) => {
            const items = Array.from(
                accordion.querySelectorAll(".clinical-item")
            )
            const summaries = items.map((it) =>
                it.querySelector(".clinical-item__summary")
            )

            function collapseAll() {
                items.forEach((it) => {
                    it.classList.remove("expanded")
                    const btn = it.querySelector(".clinical-item__summary")
                    const panel = it.querySelector(".clinical-item__panel")
                    const toggle = it.querySelector(".clinical-item__toggle")
                    if (btn) btn.setAttribute("aria-expanded", "false")
                    if (panel) panel.setAttribute("aria-hidden", "true")
                    if (toggle) {
                        toggle.textContent = "+"
                        toggle.setAttribute("aria-expanded", "false")
                        toggle.setAttribute("aria-label", "Expand section")
                    }
                })
            }

            function collapseItem(item) {
                item.classList.remove("expanded")
                const btn = item.querySelector(".clinical-item__summary")
                const panel = item.querySelector(".clinical-item__panel")
                const toggle = item.querySelector(".clinical-item__toggle")
                if (btn) btn.setAttribute("aria-expanded", "false")
                if (panel) panel.setAttribute("aria-hidden", "true")
                if (toggle) {
                    toggle.textContent = "+"
                    toggle.setAttribute("aria-expanded", "false")
                    toggle.setAttribute("aria-label", "Expand section")
                }
            }

            function expandItem(item) {
                collapseAll()
                item.classList.add("expanded")
                const btn = item.querySelector(".clinical-item__summary")
                const panel = item.querySelector(".clinical-item__panel")
                const toggle = item.querySelector(".clinical-item__toggle")
                if (btn) btn.setAttribute("aria-expanded", "true")
                if (panel) panel.setAttribute("aria-hidden", "false")
                if (toggle) {
                    toggle.textContent = "−"
                    toggle.setAttribute("aria-expanded", "true")
                    toggle.setAttribute("aria-label", "Collapse section")
                }
                // ensure expanded item is scrolled into view (smoothly)
                // except when suppressed during initialisation
                if (!suppressInitialScroll) {
                    item.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    })
                }
            }

            // click handlers
            summaries.forEach((btn, idx) => {
                const item = items[idx]
                btn.addEventListener("click", (e) => {
                    // prevent bubbling so item-level click doesn't also fire
                    e.stopPropagation()
                    const expanded =
                        btn.getAttribute("aria-expanded") === "true"
                    if (expanded) {
                        // clicking the summary on an expanded item will collapse it
                        collapseItem(item)
                        return
                    }
                    expandItem(item)
                })

                // keyboard navigation
                btn.addEventListener("keydown", (e) => {
                    const key = e.key
                    if (key === "ArrowRight") {
                        e.preventDefault()
                        const next = summaries[idx + 1] || summaries[0]
                        next.focus()
                    } else if (key === "ArrowLeft") {
                        e.preventDefault()
                        const prev =
                            summaries[idx - 1] ||
                            summaries[summaries.length - 1]
                        prev.focus()
                    } else if (key === "Escape") {
                        // Restore focus to the first summary and ensure one item is open
                        if (items[0]) {
                            expandItem(items[0])
                            summaries[0].focus()
                        }
                    } else if (key === "Enter" || key === " ") {
                        // toggle on Enter/Space
                        e.preventDefault()
                        btn.click()
                    }
                })
            })

            // Do not collapse on outside clicks: keep at least one item expanded

            // Make the whole item surface clickable (except interactive controls)
            items.forEach((item, idx) => {
                // ensure we can attach a visible toggle control
                let toggle = item.querySelector(".clinical-item__toggle")
                if (!toggle) {
                    toggle = document.createElement("button")
                    toggle.type = "button"
                    toggle.className = "clinical-item__toggle"
                    toggle.setAttribute("aria-expanded", "false")
                    toggle.setAttribute("aria-label", "Expand section")
                    toggle.textContent = "+"
                    item.appendChild(toggle)
                }

                // clicking anywhere on the item (except summary or toggle) toggles it
                item.addEventListener("click", (e) => {
                    if (e.target.closest(".clinical-item__summary")) return
                    if (e.target.closest(".clinical-item__toggle")) return
                    const summary = item.querySelector(
                        ".clinical-item__summary"
                    )
                    const expanded =
                        summary &&
                        summary.getAttribute("aria-expanded") === "true"
                    if (expanded) {
                        collapseItem(item)
                    } else {
                        expandItem(item)
                    }
                })

                // toggle behaviour (bottom-right +/- button): toggles expand/collapse
                toggle.addEventListener("click", (e) => {
                    e.stopPropagation()
                    const expanded = item.classList.contains("expanded")
                    if (expanded) {
                        collapseItem(item)
                    } else {
                        expandItem(item)
                    }
                })
            })

            // initialize collapsed state explicitly, then open the first item by default
            // suppress scrolling while we programmatically open the first panel
            let suppressInitialScroll = true
            collapseAll()
            if (items.length > 0) expandItem(items[0])
            // allow user interactions to scroll after initialisation
            suppressInitialScroll = false
        })
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () =>
            initClinicalAccordion(document)
        )
    } else {
        initClinicalAccordion(document)
    }

    // fallback export for testing
    window.__initClinicalAccordion = initClinicalAccordion
})()
