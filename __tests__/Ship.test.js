const Ship = require("../src/Ship.js");
const Port = require("../src/Port.js");
const Itinerary = require("../src/Itinerary");



describe('Ship', () => {
    describe('with ports and an itinerary', () => {
        let zaun;
        let piltover;
        let ship;
        let itinerary;

        beforeEach(() => {
            zaun = {
                addShip: jest.fn(),
                removeShip: jest.fn(),
                name: 'Zaun',
                ships: []
            };

            piltover = {
                addShip: jest.fn(),
                removeShip: jest.fn(),
                name: 'Piltover',
                ships: []
            };

            itinerary = {
                ports: [zaun, piltover]
            };

            ship = new Ship(itinerary);
        });

        it('can be instantiated', () => {
            expect(ship).toBeInstanceOf(Object);
        });

    it('gets added to Port on instantiation', () => {
        expect(zaun.addShip).toHaveBeenCalledWith(ship);
    });

    it('has a starting port', () => {
        expect(ship.currentPort).toBe(zaun);
    });

    it('lets ship sail', () => {

        ship.setSail();

        expect(ship.currentPort).toBeFalsy();
        expect(zaun.removeShip).toHaveBeenCalledWith(ship);

    });

    it('cannot set sail further than the last index in the itinerary', () => {

        ship.setSail();
        ship.dock();

        expect(() => ship.setSail()).toThrowError('Reached end of itinerary');
    });
   
    it('can dock at a different port', () => {
        itinerary = {
            ports: [zaun, piltover]
        };

        ship.setSail();
        ship.dock()

        expect(ship.currentPort).toBe(piltover);
        expect(piltover.addShip).toHaveBeenCalledWith(ship);
    });
});
});