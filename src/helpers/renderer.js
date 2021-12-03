const renderer = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    } catch (error) {
      console.log("Ошибка при чтении файла", error);
      throw new Error("Ошибка при чтении файла");
    }
  });
};

export default renderer;
