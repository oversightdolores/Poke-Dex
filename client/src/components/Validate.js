export function validateImg(input) {
  const img = input.image;
  const imgRegex = /https?:\/\/.*\.(?:png|jpg|jpeg|svg)/i;
  return imgRegex.test(img);
}

export function validate(input, pokemons) {
  let errors = {};
  let RegExpression = /^[a-z\s]*$/;

  if (!input.name) {
    errors.name = "Se requiere un nombre";
  }
  if (pokemons.indexOf(input.name) !== -1) {
    errors.name = "ya existe un pokemon con ese nombre";
  }
  if (!RegExpression.test(input.name)) {
    errors.name = "No se permiten números ni caracteres especiales";
  }
  if (input.name.length > 10) {
    errors.name = `El nombre no puede tener más de 10 caracteres.`;
  }
  if (!validateImg(input)) {
    errors.image = "No es una imagen";
  }
  if (input.hp < 1 || input.hp > 150) {
    if (input.hp < 1) {
      errors.hp = "El hp no puede ser menor a 1";
    }
    if (input.hp > 150) {
      errors.hp = "El hp no puede ser mayor a 150";
    }
  }
  if (input.attack < 1 || input.attack > 200) {
    if (input.attack < 1) {
      errors.attack = "El ataque no puede ser menor a 1";
    }
    if (input.attack > 200) {
      errors.attack = "El ataque no puede ser mayor a 200";
    }
  }
  if (input.defense < 1 || input.defense > 200) {
    if (input.defense < 1) {
      errors.defense = "La defensa no puede ser menor a 1";
    }
    if (input.defense > 200) {
      errors.defense = "La defensa no puede ser mayor a 200";
    }
  }
  if (input.speed < 1 || input.speed > 100) {
    if (input.speed < 1) {
      errors.speed = "La velocidad no puede ser menor a 1";
    }
    if (input.speed > 100) {
      errors.speed = "La velocidad no puede ser mayor a 100";
    }
  }
  if (input.weight < 1 || input.weight > 1500) {
    if (input.weight < 1) {
      errors.weight = "El peso no puede ser menor a 1";
    }
    if (input.weight > 1500) {
      errors.weight = "El peso no puede ser mayor a 1500";
    }
  }
  if (input.height < 1 || input.height > 80) {
    if (input.height < 1) {
      errors.height = "La altura no puede ser menor a 1";
    }
    if (input.height > 80) {
      errors.height = "La altura no puede ser mayor a 80";
    }
  }

  if (!input.types.length) {
    errors.types = "Se requiere al menos un tipo";
  }

  return errors;
}
