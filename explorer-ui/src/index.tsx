import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { createRoot } from "react-dom/client"
const container = document.getElementById("app")
container!.className += "theme default"
const root = createRoot(container!)

// React in strict mode executes twice the side effects
// to catch errors. Only applies in development environment.
//
// https://reactjs.org/docs/strict-mode.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
