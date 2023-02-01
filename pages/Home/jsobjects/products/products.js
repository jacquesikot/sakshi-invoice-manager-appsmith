export default {
	// Some test data to allow template function
	testData: [
		{
			id: '1',
			name: 'Product 1',
			image: '',
			price: 1200,
			description: 'descript',
		},
				{
			id: '2',
			name: 'Product 2',
			image: '',
			price: 1500,
			description: 'descript',
		},
				{
			id: '3',
			name: 'Product 3',
			image: '',
			price: 1000,
			description: 'descript',
		},
		{
			id: '4',
			name: 'Product 4',
			image: '',
			price: 800,
			description: 'descript 5',
		},
	],
	// Function to map returned query data to template acceptable data - returns null for keys without value
	productDataMapping: (data, mappingConfig) => {
  return data.map((item) => {
    const mappedItem = {};
    for (const [key, value] of Object.entries(mappingConfig)) {
      if (item[value]) {
        mappedItem[key] = item[value];
      } else {
        mappedItem[key] = null;
      }
    }
    return mappedItem;
  });
},
	getProducts: async () => {
		// boolean to switch between test and live data
		const isTestData = false;
		if (isTestData) {
			return products.testData;
		} else {
			// Add your Query here
			const productsData = await getProducts.run()
			
			//Please ensure that you have added your data mapping on the right side of the object in the mappingConfig variable. The keys 			in the mappingConfig object correspond to the variables in the template, and the values should be the keys in your data 					result that correspond to those template variables. Without the proper data mapping, the template will not be able to 						correctly display the values from your data
		const mappingConfig = {
      id: 'id',
      name: 'name',
      image: 'image',
      price: 'price',
      description: 'description',
    };
			
			// Pass mapping function and query data to return data values accepted by template
			return products.productDataMapping(productsData, mappingConfig);
		}
	},
	updateProductImage: async () => {
		const file = ProductImagePicker.files[0];
		
		const url = await s3.uploadToS3(file);
		
		console.log('URL:', url)
	},
	updateProductData: async () => {
		await updateProductApi.data
	},
	deleteProduct: async () => {
		await deleteProductApi.data
	},
}