// export const fetchAllProducts = () => {
//     return new Promise(async (resolve) => {
//         const response = await fetch('http://localhost:50500/products')
//         const data = await response.json();
//         resolve({ data });
//     })
// }

export const createProduct = (product) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('http://localhost:5000/api/products',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            }
        );
        const data = await response.json();
        resolve(data)
    })
};


export const updateProductById = (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(
               `http://localhost:5000/api/products/${product.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product),
                }
            );
            if (!response.ok) {
                throw new Error(" failed to connect ");
            }
            const data = await response.json();
            resolve({ data });
        } catch (error) {
            reject(error);
        }
    });
};


export const fetchCetegory = () => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5000/api/categories')
        const data = await response.json();
        resolve({ data });
    })
}

export const fetchBrands = () => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5000/api/brands')
        const data = await response.json();
        resolve({ data });
    })
}

export const getProductById = (id) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5000/api/products/' + id)
        const data = await response.json();
        resolve({ data });
    })
}
export const getProductsByFilters = (filter, sort, pagination) => {
    // filter = {"category":["smartphone","laptop"]}
    // sort = {"_sort":"price",_order:"desc"}
    // pagination = {"page":1,_limit:10}
    //TODO : on server we will support multiple values 
    let queryString = '';
    for (let key in filter) {
        const categoryValues = filter[key]
        if (categoryValues.length) {
            const lastCategoryValue = categoryValues[categoryValues.length - 1]
            queryString += `${key}=${lastCategoryValue}&`
        }


    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
    }

    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5000/api/products?' + queryString);
        const data = await response.json();
        const totalItems = response.headers.get('X-Total-Count')
        resolve({data:{products:data, totalItems:totalItems}});
    })
}