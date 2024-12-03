/*const {determinarGanador, jerarquiaFondos} = require('../main.js');
beforeEach(() => {
    global.addEventListener = jest.fn();
    global.document.createElement = jest.fn().mockReturnValue({
        addEventListener: jest.fn()
    });
});

test('Gana el jugador1 cuando el valos de huevo1 es mayor que huevo2', () => {
    const jugador1 = "A";
    const jugador2 = "B";
    const huevo1 = "4";
    const huevo2 = "2";
    const resultado = determinarGanador(jugador1, jugador2, huevo1, huevo2);
    expect(resultado).toBe(jugador1);
}); */

const addHoverEffect = require('../main.js');

describe('Pruebas para addHoverEffect', () => {
    let card;
    beforeEach(() => {
        card = document.createElement("div");
        card.addEventListener = jest.fn();
        card.getBoundingClientRect = jest.fn().mockReturnValue({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        });
        global.addEventListener = jest.fn();
    });
    test("Llamar a la EverListener", () => {
        addHoverEffect(card);
        expect(card.addEventListener).toHaveBeenCalledTimes(1);
        expect(card.addEventListener).toHaveBeenCalledWith("mousemove", expect.any(Function));
    });
});