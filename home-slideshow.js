(() => {
    const images = Array.from({ length: 13 }, (_, index) =>
        `images/hero-slide${index + 1}.webp`
    );
    const slides = document.querySelectorAll(".hero-slide");
    const interval = 6000;
    let activeIndex = 0;
    let activeLayerIndex = 0;
    let inactiveSlideIndex = 1;
    let timer;
    let loading = false;

    if (slides.length !== 2) {
        console.error("Homepage slideshow requires exactly two image layers.");
        return;
    }

    function scheduleNextSlide() {
        clearTimeout(timer);
        if (document.visibilityState === "visible") {
            timer = setTimeout(showNextSlide, interval);
        }
    }

    async function showNextSlide() {
        if (document.visibilityState !== "visible" || loading) return;

        loading = true;
        const nextIndex = (activeIndex + 1) % images.length;
        const nextSlide = slides[inactiveSlideIndex];
        nextSlide.src = images[nextIndex];

        try {
            if (typeof nextSlide.decode === "function") {
                await nextSlide.decode();
            } else if (!nextSlide.complete) {
                await new Promise((resolve, reject) => {
                    nextSlide.addEventListener("load", resolve, { once: true });
                    nextSlide.addEventListener("error", reject, { once: true });
                });
            }
        } catch (error) {
            console.error(`Unable to load homepage slide ${nextIndex + 1}:`, error);
            activeIndex = nextIndex;
            loading = false;
            scheduleNextSlide();
            return;
        }

        if (document.visibilityState !== "visible") {
            loading = false;
            return;
        }

        slides[activeLayerIndex].classList.remove("is-active");
        nextSlide.classList.add("is-active");
        activeLayerIndex = inactiveSlideIndex;
        inactiveSlideIndex = activeLayerIndex === 0 ? 1 : 0;
        activeIndex = nextIndex;
        loading = false;
        scheduleNextSlide();
    }

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            clearTimeout(timer);
        } else {
            scheduleNextSlide();
        }
    });

    scheduleNextSlide();
})();
