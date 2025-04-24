export const createUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: { "Content-Type": "application/json" }

        });

        const data = await response.json();
        resolve({ data });
    });
};




export const checkUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                body: JSON.stringify(userInfo),
                headers: { "Content-Type": "application/json" },

            });

            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject(error )
            }

        } catch (error) {
            reject( error )
        }

    });
};

export const logoutUser = () => {
    return new Promise(async (resolve, reject) => {
        resolve({ data: "User successfully logout" });
    });
};
