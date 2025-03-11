// Mensajes de error activar en produccion
/* export const INPUT_STRING_ERROR_MESSAGE = "Este campo es requerido"; // Mensaje de error para campos de texto
export const INPUT_NUMBER_ERROR_MESSAGE = "Este campo es requerido"; // Mensaje de error para campos numéricos
export const INPUT_DATE_ERROR_MESSAGE = "Este campo es requerido"; // Mensaje de error para campos de fecha

export const INPUT_PHOTO_ERROR_MESSAGE = "Este archivo es requerido"; // Mensaje de error para campos de foto

export const INPUT_SELECT_ERROR_MESSAGE = "Este campo es requerido"; // Mensaje de error para campos de selección */

// Son todos falsos por que hara que los formularios avancen sin validaciones
export const INPUT_STRING_ERROR_MESSAGE = false;
export const INPUT_NUMBER_ERROR_MESSAGE = false;
export const INPUT_DATE_ERROR_MESSAGE = false;

export const INPUT_PHOTO_ERROR_MESSAGE = false;

export const INPUT_SELECT_ERROR_MESSAGE = false;

export const INPUT_NUMBER_VALIDATION = {
  valueAsNumber: true,
  validate: (value: number) => {
    if (value > 0) {
      return true;
    }

    return "Esto deberia ser un numero";
  }
};

export const INPUT_CI_VALIDATION = {
  validate: (value: string) => {
    if (!/^[VEJPG]\d{8}$/.test(value)) {
      return "La cédula debe tener exactamente 8 caracteres numericos";
    }
    return true;
  }
};

export const INPUT_PASSPORT_VALIDATION = {
  validate: (value: string) => {
    if (!/^[A-Za-z0-9]{9}$/.test(value)) {
      return "El pasaporte debe tener exactamente 9 caracteres alfanuméricos";
    }
    return true;
  }
};

export const INPUT_BANK_ACCOUNT_VALIDATION = {
  validate: (value: string) => {
    if (!/^\d{20}$/.test(value)) {
      return "La cuenta bancaria debe tener exactamente 20 digitos numericos";
    }
    return true;
  }
};

export const INPUT_HOMELAND_CI_VALIDATION = {
  validate: (value: string) => {
    if (!/^\d{9}$/.test(value)) {
      return "El carnet de la patria debe tener exactamente 9 digitos numericos";
    }
    return true;
  }
};
