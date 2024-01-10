export const getProductsValue = (basketValue: string) => {
	let productsInBasket = 0;
	const products = JSON.parse(basketValue);
	products.forEach((product) => {
		productsInBasket += product.quantity;
	});

	return productsInBasket;
};