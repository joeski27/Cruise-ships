const Itinerary = require("../src/Itinerary");
const Port = require("../src/Port");
const Ship = require("../src/Ship");




describe('Port', () => {
    describe('with port and ships', () => {
        let port;

        beforeEach(() => {
            port = new Port('Zaun');
        })
    
        it('returns an object', () => {
        expect(new Port()).toBeInstanceOf(Object);
          });

        it('sets the name property', () => {
        
        expect(port.portName).toEqual('Zaun');
         });

    it('adds a Ship that docks at Port', () => {
        const ship = jest.fn();

        port.addShip(ship);

        expect(port.ships).toContain(ship);
    });

    it('removes a Ship from a Port', () => {
        const violyn = jest.fn();
        const jaymel = jest.fn();

        port.addShip(violyn);
        port.addShip(jaymel);
        port.removeShip(jaymel);

        expect(port.ships).not.toContain(jaymel);
    });
    });
});