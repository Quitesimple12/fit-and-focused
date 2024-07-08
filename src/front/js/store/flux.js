const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//authentication
			message: null,
        	token: null,
        	user: null,
        	logged: null,
			//everything else
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			signup: async(dataEmail, dataPassword) => {
				try{
					const response = await fetch(
						process.env.BACKEND_URL + "/api/signup",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email: dataEmail,
								password: dataPassword
							}),
						}
					);
					console.log(response)
					if (response.ok) {
						const data =  await response.json();
						console.log(data)
						return true;
					}
					else {
						const errorData = await response.json()
						if  (errorData.message) {
							console.error('Signup error: ${errorData.message}');
						}
						else {
							console.error("An error occured in user creation.");
						}
						return false
					}
				} catch (error) {
					console.error("An error occurred during user creation", error);
				}
				return false;
			}
			},
			login: async (dataEmail, dataPassword) => {
				try{
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: dataEmail,
							password: dataPassword,
						}),
					});
					console.log(response);
					if(response.ok) {
						const data = await response.json();
						setStore({
							user: data.user,
							token: data.token,
							logged: true,
						});
						sessionStorage.setItem("token, data.token");
						sessionStorage.setItem("userID", data.user.id);
						return true;
					}
					else {
						console.error("An error occurred during user login");
						return false;
					  }
					} catch (error) {
					  console.error("An error occurred during user login", error);
					  return false;
					}
				  },
				}
			}

export default getState;
