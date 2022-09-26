const backlighted = document.querySelectorAll(".backlight")
backlighted.forEach(el => el.addEventListener("mousemove", (event: MouseEvent) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty("--x", (event.offsetX).toString());
    }
))