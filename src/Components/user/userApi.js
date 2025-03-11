export const fetchAllOrder = (uerId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:5050/orders/?user.id=" + uerId);
        const data = await response.json();
        resolve({ data });
    });
};

export const fetchLoginInfo = async (userId) => {
        const response = await fetch("http://localhost:5050/users/" +userId);
        const data = await response.json();
        return {data}
   
};


export const updateUser = (update) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:5050/users/" + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "appliction/json" },
        });


        const data = await response.json();
        resolve({ data });
    });
};
