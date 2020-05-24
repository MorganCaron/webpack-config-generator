import React from "react";
import ReactDOM from "react-dom";

import { Hello } from "ts/React";

ReactDOM.render(
	<Hello compiler="TypeScript" framework="React" />,
	document.querySelector("#react")
);
