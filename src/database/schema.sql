DROP TABLE IF EXISTS Pokemons;

CREATE TABLE IF NOT EXISTS Pokemons (PokedexID INTEGER PRIMARY KEY, PokemonName TEXT,
BaseHP INTEGER, BaseATK INTEGER, BaseDEF INTEGER, BaseSPA INTEGER, BaseSPD INTEGER,
BaseSPE INTEGER);

INSERT INTO Pokemons (PokedexID, PokemonName, BaseHP, BaseATK, BaseDEF, BaseSPA, BaseSPD, BaseSPE) VALUES (3, 'Venusaur', 80, 82, 83, 100, 100, 80);
INSERT INTO Pokemons (PokedexID, PokemonName, BaseHP, BaseATK, BaseDEF, BaseSPA, BaseSPD, BaseSPE) VALUES (6, 'Charizard', 78, 84, 78, 109, 85, 100);
INSERT INTO Pokemons (PokedexID, PokemonName, BaseHP, BaseATK, BaseDEF, BaseSPA, BaseSPD, BaseSPE) VALUES (9, 'Blastoise', 79, 83, 100, 85, 105, 78);