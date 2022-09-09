// Corroborar si la fecha ingresada tiene formato valido
export function isValidDate(str) {
  const regexDate =
    /^[1-2][089]\d{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
  return regexDate.test(str);
}

export function hasSpecialChars(str) {
  const regexSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regexSpecialChars.test(str);
}

export function isURL(str) {
  const regexURL = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
  return regexURL.test(str);
}

export default function validate(input) {
  const error = {};

  if (!input.name) {
    error.name = "Name is required";
  } else if (hasSpecialChars(input.name)) {
    error.name = "Name may not contain special characters";
  } else if (input.name.trim() === "") {
    error.name = "Name may not be empty";
  } else if (input.name.length > 50 || input.name.length < 3) {
    error.name = `Characters in the name must be between 50 and 3`;
  }

  if (!input.description) {
    error.description = "Description is required";
  } else if (input.description.length < 10) {
    error.description = "Description must be longer";
  } else if (input.description.length > 300) {
    error.description = "Description can only have max 300 characters";
  } else if (input.description.trim() === "") {
    error.description = "Description may not be empty";
  }

  if (isValidDate(input.released === false)) {
    error.released = "Invalid year";
  } else if (!input.released) {
    error.released = "Invalid date";
  }

  if (input.rating > 5) {
    error.rating = "Rating must be lower than 5";
  } else if (input.rating < 0) {
    error.rating = "Invalid rating value";
  } else if (isNaN(parseInt(input.rating))) {
    error.rating = "Only number Allowed";
  }

  if (input.image) {
    if (isURL(input.image) === false) {
      error.image = "Invalid URL";
    }
  }

  if (input.genres.length < 1) {
    error.genres = "You have to choose at least one Genre";
  }

  if (input.platforms.length < 1) {
    error.platforms = "You have to choose ar least one Platform";
  }

  return error;
}
