/**productObj === errorsObj */

export const productValidation = (product: {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageUrl: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  };
  const validImageUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageUrl);
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "the Title Must Be Between10 And 80 Characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 80 ||
    product.description.length > 800
  ) {
    errors.description =
      "the description Must Be Between 80 And 800 Characters";
  }

  if (!product.imageUrl.trim() || !validImageUrl) {
    errors.imageUrl = "please Insert Valid Image URL";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    product.price = "please enter The correct number";
  }
  return errors;
};