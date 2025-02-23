document.addEventListener("DOMContentLoaded", () => {
    // Основной код для управления изображениями
    const images = [
        { className: "mishaMOVE", behavior: "moveDown", resetPosition: true },
        { className: "maratMove", behavior: "moveDown", resetPosition: true },
        { className: "arsMove", behavior: "moveDownAndLeft", resetPosition: true },
        { className: "kirMove", behavior: "moveDownAndLeft", resetPosition: true },
        { className: "yahaHODIT", behavior: "randomMove", resetPosition: false }
    ];

    function handleImageClick(event, behavior, shouldReset) {
        const imgElement = event.target;
        if (!imgElement || imgElement.classList.contains("disabled")) return;

        imgElement.classList.add("disabled"); // Блокируем повторные клики
        imgElement.style.transform = "scale(1.2)"; // Кратковременное увеличение

        const currentWidth = parseInt(window.getComputedStyle(imgElement).width);
        const currentHeight = parseInt(window.getComputedStyle(imgElement).height);

        let additionalTransform;

        if (behavior === "moveDown") {
            additionalTransform = `translateY(${currentHeight / 2}px)`; // Спуск вниз
        } else if (behavior === "moveDownAndLeft") {
            additionalTransform = `translate(-${currentWidth / 2}px, ${currentHeight / 2}px)`; // Спуск вниз и влево
        } else if (behavior === "randomMove") {
            const randomDirection = Math.random() > 0.5 ? 1 : -1; // Случайное направление
            const verticalShift = randomDirection * (currentHeight * 0.15); // ±15% высоты
            const horizontalShift = -currentWidth * 0.35; // Влево на 35% ширины
            additionalTransform = `translateX(${horizontalShift}px) translateY(${verticalShift}px)`;
        }

        setTimeout(() => {
            imgElement.style.transform = `${additionalTransform}`;
        }, 200);

        if (shouldReset) {
            setTimeout(() => {
                imgElement.style.transform = "";
                imgElement.classList.remove("disabled");
            }, 1000);
        } else {
            setTimeout(() => {
                imgElement.classList.remove("disabled");
            }, 1000);
        }
    }

    images.forEach(image => {
        const imgElement = document.querySelector(`.${image.className}`);
        if (imgElement) {
            imgElement.addEventListener("click", event => {
                handleImageClick(event, image.behavior, image.resetPosition);
            });
        }
    });
});