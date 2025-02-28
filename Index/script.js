document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = '100px';
        circle.style.height = '100px';
        circle.style.left = `${event.clientX - 50}px`;
        circle.style.top = `${event.clientY - 50}px`;
        document.body.appendChild(circle);
        setTimeout(() => {
            circle.classList.add('animate');
        }, 0);
        setTimeout(() => {
            circle.remove();
        }, 300);
    });

    function setBodyMinHeight() {
        const body = document.body;
        const html = document.documentElement;

        const documentHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        if (documentHeight < window.innerHeight) {
            body.style.minHeight = window.innerHeight + "px";
        } else {
            body.style.minHeight = "100vh";
        }
    }

    window.addEventListener('load', setBodyMinHeight);
    window.addEventListener('resize', setBodyMinHeight);
});