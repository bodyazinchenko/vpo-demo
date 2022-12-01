const getValidationErrors = (err: any) => {
  if (!err) return null;

  const validationErrors = {} as any;

  err?.inner?.forEach((error: any) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

export default getValidationErrors;
