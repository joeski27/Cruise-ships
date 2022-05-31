(function exportController() {
    function Controller (ship) {
        this.initialiseSea();
        this.ship = ship;

        this.initialiseSea();

        document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
        });
}

Controller.prototype = {
    initialiseSea() {
        const backgrounds = [
            'images/water0.png',
            'images/water1.png',
        ];
        let backgroundIndex = 0;
            window.setInterval(() => {
                document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
            backgroundIndex += 1;
        }, 1000);
    },

    renderPorts(ports) {
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';

        ports.forEach( (port, index) => {
            const newPortElement = document.createElement('div');

            newPortElement.className = 'port';
            newPortElement.dataset.portName = port.portName;
            newPortElement.dataset.portIndex = index;

            portsElement.appendChild(newPortElement);

            const portsElementWidth = parseInt(portsElement.style.width, 10);
            portsElement.style.width = `${portsElementWidth + 256}px`;
        });
    },

    renderShip() {
        const ship = this.ship;

        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);

        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },

    setSail() {
        const ship = this.ship

        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        console.log(nextPortElement);

        if (!nextPortElement) {
            return alert('STOP THERE!  There is nowhere else to sail. Do you want to fall off the earth?');
        }

        this.renderMessage(`Buckle up and chill. We're now departing ${ship.currentPort.portName}`);

        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === (nextPortElement.offsetLeft - 32)) {
            ship.setSail();
            ship.dock();
            clearInterval(sailInterval);
        }

        shipElement.style.left = `${shipLeft + 1}px`;
        }, 25);

        setTimeout(() => {
            const nextPortName = 
            this.renderMessage(`Grab your bikinis! Arriving at ${ship.itinerary.ports[currentPortIndex + 1].portName}`)
        }, 3500);
    },

    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;

        const viewport = document.querySelector('#viewport');
        viewport.appendChild(messageElement);

        setTimeout(() => {
            viewport.removeChild(messageElement);
        }, 3000);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
} else {
    window.Controller = Controller;
}
}());