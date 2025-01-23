import { Provider } from "./components/ui/provider"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider>
      <App />
      <ToastContainer />

    </Provider>
)