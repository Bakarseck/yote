class ChessGame {

    /**
     * The constructor initializes the properties of a game object.
     */
    constructor() {
        this.pionToMove = null;
        this.isOrange = true;
        this.remainingOrange = 12;
        this.remainingGreen = 12;
        this.startTime = null;
    }
    
    
    /**
     * The function `changeBody()` updates the content of the body element, sets up a timer, creates a
     * grid, and adds click event listeners to the grid items.
     */
    changeBody() {
        document.body.innerHTML = this.bodyContent;
        const gridContainer = document.querySelector('.grid-container');
        this.startTime = new Date();
        this.updateTimer();
        this.createGrid(gridContainer);

        const allChilds = gridContainer.children;
        Object.entries(allChilds).map(([_, value]) => {
            value.addEventListener('click', (event) => {
                
                this.move(value);
            });
        });
    }

    /**
     * The function `move` handles the logic for moving pions in a game, including checking for valid
     * moves and capturing opponent pions.
     * @param value - The `value` parameter is the DOM element that triggered the move event.
     */
    move(value) {
        let positions = value.classList[1].split('-')[1];

        if (value.childNodes.length == 0) {
            if (this.pionToMove == null) {
                this.drawPions(positions);
            } else {

                let positionToMove = this.pionToMove.classList[1].split('-')[1];
                const validOffsets = [-1, 1, -5, 5];
                const KillAdvers = [-2, 2, -10, 10];

                if (validOffsets.some(offset => positions - positionToMove === offset)) {
                    this.movePion(this.pionToMove, value);
                } else if (KillAdvers.some(offset => positions - positionToMove === offset)) {
                    let adversePosition = (Number(positions) + Number(positionToMove)) / 2;

                    if (this.isAdverse(adversePosition)) {
                        this.movePion(this.pionToMove, value);
                    }

                    this.verifier()
                }

            }
        } else if (this.pionToMove == null) {
            this.pionToMove = value;
            value.style.background = "#389EF2";
        } else {
            if (value == this.pionToMove) {
                this.pionToMove = null;
                value.style.background = "";
            }
        }
    }

    /**
     * The function checks if there is an adverse piece in a specific position on the board and removes
     * it if it exists.
     * @param advPos - The `advPos` parameter represents the position of the adverse case.
     * @returns a boolean value. It returns true if there is only one child node in the element with
     * the class name `case-` and the class name of that element's third class does not match
     * the third class of the element with the class name `this.pionToMove`. Otherwise, it returns
     * false.
     */
    isAdverse(advPos) {
        let adverse = document.querySelector(`.case-${advPos}`)
        if (adverse.childNodes.length == 1 && adverse.classList[2] != this.pionToMove.classList[2] ) {
            let advPion = adverse.querySelector('img')
            advPion.remove()

            let advPlayer = adverse.classList[2]
            adverse.classList.remove(advPlayer)

            return true
        }
        return false
    }

    /**
     * The function moves a chess piece (pion) from one location (toMove) to another location
     * (destination) and updates the player's class accordingly.
     * @param toMove - The "toMove" parameter represents the element that contains the pawn (pion) that
     * needs to be moved. It is expected to be a DOM element.
     * @param destination - The `destination` parameter is the element where the `pion` (a game piece)
     * will be moved to. It is the element that will receive the `pion` as a child element.
     */
    movePion(toMove, destination) {
        let pion = toMove.querySelector("img");
        destination.append(pion);
        this.pionToMove.style.background = "";
        this.pionToMove = null;

        let currPlayer = toMove.classList[2]
        toMove.classList.remove(currPlayer)
        destination.classList.add(currPlayer)
    }

    /**
     * The function creates a new div element with specific class names based on the input parameter.
     * @param i - The parameter "i" is a variable that represents the value that will be used to create
     * a unique class name for each div element.
     * @returns a newly created `<div>` element with the class "case" and "case-i" where "i" is the
     * value passed as an argument to the function.
     */
    createDiv(i) {
        const div = document.createElement('div');
        div.classList.add('case');
        div.classList.add('case-' + i);
        return div;
    }

    /**
     * The function creates a grid by appending 25 div elements to a specified container.
     * @param gridContainer - The gridContainer parameter is the HTML element that will contain the
     * grid. It could be a div, section, or any other HTML element that can hold child elements.
     */
    createGrid(gridContainer) {
        for (let i = 0; i < 25; i++) {
            const div = this.createDiv(i);
            gridContainer.appendChild(div);
        }
    }

    /**
     * The `updateTimer` function calculates the elapsed time since `startTime` and updates the timer
     * display every second.
     */
    updateTimer() {
        const now = new Date();
        const elapsedMilliseconds = now - this.startTime;

        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;

        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        document.querySelector('.timer').textContent = formattedTime;

        requestAnimationFrame(() => this.updateTimer(), 1000);
    }

    /**
     * The function `drawPions` creates and appends an image element to a parent element, based on the
     * current position and the state of the game.
     * @param currentPosition - The `currentPosition` parameter represents the current position of the
     * pion (game piece) on the board.
     * @returns The function does not have a return statement.
     */
    drawPions(currentPosition) {
        const img = document.createElement('img');
        const parent = document.querySelector('.case-' + currentPosition);
        parent.classList.add(`${this.isOrange}`)
        img.style.width = '80%';
        img.style.height = '80%';
        img.style.borderRadius = '50%';
        let image = this.isOrange ? "orange.png" : "green.png";
        if (image == "orange.png" && this.remainingOrange <= 0) {
            return;
        }
        if (image == "green.png" && this.remainingGreen < 0) {
            return;
        }
        image == "orange.png" ? this.remainingOrange -= 1 : this.remainingGreen -= 1;
        img.setAttribute("src", image);
        localStorage.setItem("current", image.slice(0, -4))

        this.isOrange = !this.isOrange;
        parent.append(img);
    }

    verifier() {
        let allImages = document.querySelectorAll("img")
        let currentImage = allImages[0].getAttribute("src")
        for (let i = 1; i < allImages.length; i++) {
            let image = allImages[i].getAttribute("src")
            if (image != currentImage) {
                return
            }
        }
        alert(`${currentImage} a gagné`)
    }

    /**
     * The start function adds an event listener to a start button and calls the changeBody function
     * when the button is clicked.
     */
    start() {
        const startButton = document.querySelector('.start');
        startButton.addEventListener('click', () => this.changeBody());
    }

    /* The `bodyContent` variable is a string that contains the HTML markup for the content of the body
    element in the chess game. It includes a container div with player elements, a grid container, a
    timer element, and a current player element. This string is used to set the innerHTML of the
    body element in the `changeBody` function. */
    bodyContent = `
        <div class="container">
            <div class="player1 player">P1</div> 
            <div class="grid-container"></div>
            <div class="timer">00:00</div>
            <div class="player2 player">P2</div>
            <div class="current-player">Current Player: P1</div>
        </div>
    `;
}

const chessGame = new ChessGame();
chessGame.start();