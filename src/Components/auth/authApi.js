export const createUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:5050/users", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: { "Content-Type": "application/json" },

        });

        const data = await response.json();
        resolve({ data });
    });
};




export const checkUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const email = userInfo.email
        const password = userInfo.password
        const response = await fetch("http://localhost:5050/users?email=" + email);
        const data = await response.json();
        
        if (data.length) {
            if (password === data[0].password) {
                resolve({ data: data[0] })
            } else {
                reject({ message: "Wrong password" })
            }
        } else
            reject({ message: "User not found" })
    });
};

export const logoutUser = () => {
    return new Promise(async (resolve, reject) => { 
        resolve({ data :"User successfully logout" });
    });
};
