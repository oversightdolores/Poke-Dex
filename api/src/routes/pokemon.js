const express = require("express");
const { Op } = require("sequelize");
const router = express();
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const getApiInfo = async () => {
  const dataApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  const apiInfo = dataApi.data.results.map(async (e) => {
    const pokemon = await axios.get(e.url);
    const type = pokemon.data.types.map((e) => {
      return {
        name: e.type.name,
      };
    });
    const pokemonInfo = pokemon.data;
    const pokemonCreated = {
      id: pokemonInfo.id,
      name: pokemonInfo.name,
      hp: pokemonInfo.stats[0].base_stat,
      attack: pokemonInfo.stats[1].base_stat,
      defense: pokemonInfo.stats[2].base_stat,
      speed: pokemonInfo.stats[5].base_stat,
      height: pokemonInfo.height,
      weight: pokemonInfo.weight,
      image: pokemonInfo.sprites.other.home.front_default,
      types: type,
    };
    return pokemonCreated;
  });
  return Promise.all(apiInfo);
};

router.get("/pokemons", async (_req, res) => {
  try {
    const infoApi = await getApiInfo();
    const dbInfo = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const allInfo = infoApi.concat(dbInfo);

    return res.json(allInfo);
  } catch (error) {
    res.status(404).send("No se encontraron pokemons");
  }
});

router.get("/pokemons/name", async (req, res) => {
  const { name } = req.query;
  try {
    const nameDb = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
      include: Type,
    });
    if (nameDb.length) {
      res.json(nameDb);
    } else {
      try {
        if (!nameDb.length) {
          const nameApi = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const nameApiInfo = nameApi.data;

          const nameApiCreated = [
            {
              id: nameApiInfo.id,
              name: nameApiInfo.name,
              hp: nameApiInfo.stats[0].base_stat,
              attack: nameApiInfo.stats[1].base_stat,
              defense: nameApiInfo.stats[2].base_stat,
              speed: nameApiInfo.stats[5].base_stat,
              height: nameApiInfo.height,
              weight: nameApiInfo.weight,
              image: nameApiInfo.sprites.other.home.front_default,
              types: nameApiInfo.types.map((e) => {
                return {
                  name: e.type.name,
                };
              }),
            },
          ];

          return res.json(nameApiCreated);
        } else {
          res.json(nameDb);
        }
      } catch (error) {
        res.status(404).send("No se encontraron pokemons");
      }
    }
  } catch (error) {
    res.status(404).send("No se encontraron pokemons");
  }
});

router.put("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const { name, hp, attack, defense, speed, height, weight, types } = req.body;
  try {
    const pokemon = await Pokemon.findByPk(id);
    const typesDb = await Type.findAll({
      where: {
        name: types,
      },
    });
    await pokemon.setTypes(typesDb);
    await pokemon.update({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    res.json(pokemon);
  } catch (error) {
    res.status(404).send("No se encontraron pokemons");
  }
});

router.delete("/pokemons/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      await pokemon.destroy();
      res.status(200).send("Pokemon eliminado");
    } else {
      res.status(404).send("Pokemon no encontrado");
    }
  } catch (error) {
    res.status(404).send("Pokemon no encontrado");
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.length > 3) {
      const pokemon = await Pokemon.findOne({
        where: {
          id: id,
        },
        include: {
          model: Type,
          attributes: ["name"],
        },
      });
      if (pokemon) {
        return res.json(pokemon);
      } else {
        return res.status(404).send("Pokemon not found");
      }
    } else {
      const pokeApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokeApiInfo = pokeApi.data;
      const pokeApiTypes = pokeApiInfo.types.map((e) => {
        return { name: e.type.name };
      });
      const pokeApiCreated = {
        name: pokeApiInfo.name,
        hp: pokeApiInfo.stats[0].base_stat,
        attack: pokeApiInfo.stats[1].base_stat,
        defense: pokeApiInfo.stats[2].base_stat,
        speed: pokeApiInfo.stats[5].base_stat,
        height: pokeApiInfo.height,
        weight: pokeApiInfo.weight,
        image: pokeApiInfo.sprites.other.home.front_default,
        types: pokeApiTypes,
      };
      return res.json(pokeApiCreated);
    }
  } catch (error) {
    res.status(404).send("No se encontraron pokemons");
  }
});

router.post("/pokemons", async (req, res) => {
  const {
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    created,
  } = req.body;

  try {
    const pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      created,
    });

    const pokemonTypes = await Type.findAll({
      where: { name: types },
    });

    pokemonCreated.addType(pokemonTypes);
    return res.send("Pokemon created successfuly");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
