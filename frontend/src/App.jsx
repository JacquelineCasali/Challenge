
import AppRoutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import SearchProvider from "./context/searchContext";

function App() {
 

  return (
  <>
  <SearchProvider>
    <AppRoutes />
       <ToastContainer 
       toastStyle={{  backgroundColor: "black" ,color:"white"}}
       position="top-center"
       autoClose={2000}

      />
      </SearchProvider>
  </>
)

}

export default App
