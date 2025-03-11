

export const createOrder = () => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:5050/cart", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        resolve({ data });
    });
}