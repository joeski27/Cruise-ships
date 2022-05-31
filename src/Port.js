(function exportPort() {
    function Port(name) {
        this.portName = name;
        this.ships = [];
    }

    Port.prototype = {
        addShip(ship) {
            this.ships.push(ship);
        },
        removeShip(ship) {
           this.ships = this.ships.filter(dockedShip => dockedShip !== ship);
        },
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Port;
    } else {
        window.Port = Port;
    }
    }());