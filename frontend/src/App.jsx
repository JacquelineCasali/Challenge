
import AppRoutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import SearchProvider from "./context/BuscaContext";
import BuscaProvider from "./context/BuscaContext";



function App() {
 

  return (
  <>
<BuscaProvider>


    <AppRoutes />
       <ToastContainer 
       toastStyle={{  backgroundColor: "black" ,color:"white"}}
       position="top-center"
       autoClose={2000}

      />
  </BuscaProvider>
  </>
)

}

export default App
