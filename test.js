    // gridContainer.addEventListener('click', (event) => {
    //     if (event.target.classList.contains('case')) {
    //         const classes = event.target.className.split(' ');

    //         for (const cls of classes) {
    //             if (cls.startsWith('case-')) {
    //                 let currentPosition = parseInt(cls.split('-')[1]);
    //                 let parent = document.querySelector('.case-' + currentPosition);
    //                 if (parent.childNodes.length > 0) {
    //                     alert("Veuillez cliquez autre part")
    //                     break
    //                 }
    //                 drawPions(currentPosition)
    //             }
    //         }
    //     }
    // })

    // img.addEventListener("click", () => {
    //     const directions = [-1, 1, -5, 5];
    //     const directionsKill = [-2, 2, -10, 10];

    //     directions.forEach(offset => {
    //         const newPosition = currentPosition + offset;
    //         const targetElement = document.querySelector('.case-' + newPosition);

    //         targetElement.addEventListener('click', () => {
    //             if (targetElement && targetElement.childNodes.length == 0) {
    //                 parent.removeChild(img);
    //                 targetElement.appendChild(img);
    //             }
    //         })
    //     });

    // })