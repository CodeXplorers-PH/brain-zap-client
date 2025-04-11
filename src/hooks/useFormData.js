const getFormData = form => {
  const formData = new FormData(form);
  const formInputs = Object.fromEntries(formData.entries());

  return formInputs;
};

const useFormData = () => {
  return getFormData;
};

export default useFormData;
