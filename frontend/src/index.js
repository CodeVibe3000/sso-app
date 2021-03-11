import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

import { GraphqlProvider } from "./apollo"

ReactDOM.render(
  <GraphqlProvider>
    <App />
  </GraphqlProvider>,
  document.getElementById("root")
)
