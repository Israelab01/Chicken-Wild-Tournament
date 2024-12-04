const { listaJugadores } = require("../mainPresala");

describe("Test suite for player management", () => {
    test("should initialize listaJugadores correctly", () => {
        expect(listaJugadores).toEqual([]);
    });
});

const { audioOpenWindow, audioCloseWindow, audioClearPlayers } = require('../mainPresala');

describe('Audio functions', () => {
    let playMock;
  
    beforeEach(() => {
      
      playMock = jest.fn().mockResolvedValue(); 
      global.Audio = jest.fn(() => ({
        play: playMock,
        volume: 0.5, 
      }));
    });
  
    afterEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('audioOpenWindow creates an Audio instance and plays the sound', () => {
      audioOpenWindow();
  
      expect(global.Audio).toHaveBeenCalledWith('sounds/pincharBoton.mp3');
      
      expect(playMock).toHaveBeenCalled();
  
      expect(global.Audio().volume).toBe(0.5);
    });
  
    test('audioCloseWindow creates an Audio instance and plays the sound', () => {
      audioCloseWindow();
  
      expect(global.Audio).toHaveBeenCalledWith('sounds/botonVolver.mp3');
      expect(playMock).toHaveBeenCalled();
      expect(global.Audio().volume).toBe(0.5);
    });
  
    test('audioClearPlayers creates an Audio instance and plays the sound', () => {
      audioClearPlayers();
  
      expect(global.Audio).toHaveBeenCalledWith('sounds/chicken-noise-196746.mp3');
      expect(playMock).toHaveBeenCalled();
      expect(global.Audio().volume).toBe(0.5);
    });
  });