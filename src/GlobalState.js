import { createContext } from "react";
import ProductApi from "./_api/ProductApi";

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
     const state = {
         productApi: ProductApi()
     }
     return(
         <GlobalState.Provider value={state}> 
             {children}
         </GlobalState.Provider>
     )
} 