const pong = () => new Promise((resolve) => {
	setTimeout(() => {
		console.log("pong");
	}, 2000);
});

const ping = async () => {
	console.log("ping");
	await pong();
};

ping();
