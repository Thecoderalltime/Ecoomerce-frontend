export const fetchAllOrder = (uerId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`http://localhost:5000/api/orders/${uerId}`);
        const data = await response.json();
        resolve({ data });
    });
};

export const fetchLoginInfo = async (userId) => {
    const response = await fetch("http://localhost:5000/api/users/" + userId);
    const data = await response.json();
    return { data }

};


export const updateUser = (update) => {
    console.log(update.id)
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`http://localhost:5000/api/users/${update.id}`
            , {
                method: "PATCH",
                body: JSON.stringify(update),
                headers: { "Content-Type": "application/json" },
            }
        );
        const data = await response.json();
        resolve({ data });
    });
};
