import libbase64 from "libbase64";

export const getEncodedUsernamePassword = (username, password) => {
	if (
		username &&
		password &&
		typeof username === "string" &&
		typeof password === "string"
	) {
		const usernameb64 = libbase64.encode(username);
		const passwordb64 = libbase64.encode(password);
		return { username: usernameb64, password: passwordb64 };
	} else {
		return;
	}
};


export const getSession = (key) => {
	// Get item from local storage
	let value = localStorage.getItem(key);
	return value;
};


export const setSession = authResult => {
	//  Set token and individual details in session storage
	let expireAt = JSON.stringify(
		authResult.expiresIn * 1000 + new Date().getTime()
	);
	localStorage.setItem("accessToken", authResult.accessToken);
	localStorage.setItem("refreshToken", authResult.refreshToken);
	localStorage.setItem("expiresIn", expireAt);
	localStorage.setItem("userId", authResult.userId);
	localStorage.setItem("username", authResult.username);
	localStorage.setItem("email", authResult.email);
	localStorage.setItem("isIdpLogin", authResult.isIdpLogin);
};
