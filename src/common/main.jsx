import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/index.css"
import "./assets/animations.css"
import "./assets/buttons.css"
import "./assets/form.css"

import Routing from "./Routing"


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
)