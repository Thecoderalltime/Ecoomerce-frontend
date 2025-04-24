import { cartItem } from "./CartSlice";

//  for set add to item in api
export const addCartItem = (item) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:5000/api/cart",{
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
,
    });
    const data = await response.json();
    console.log(data)
    resolve({ data });
  });
};


// get all cartItem form bd
export const getCatItemsById = (uerId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:5000/api/cart?user=" + uerId);
    const data = await response.json();
    resolve({ data });
  });
};

// update cart item by  cart id
export const updateCartItemByCartId = (updateData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${updateData.id}` ,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
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

// delete item form the cart

export const deleteItemFormCart = (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
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



// reset Items form database after order created successfully

export const resetCart = (userId)=>{
  return new Promise(async(resolve, reject)=>{
    const response = await getCatItemsById(userId);
    const items = response.data;
    for(let item of items){
      await deleteItemFormCart(item.id)
    }
    resolve({status: "success"});
  })
}