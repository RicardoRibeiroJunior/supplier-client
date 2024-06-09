import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { LoginPage } from "./pages/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./context/AuthProvider"
import { ProtectedLayout } from "./components/ProtectedLayout"
import { DefaultLayout } from "./layouts/DefaultLayout"
import { NewSupplierForm } from "./pages/NewSupplierForm"
import { SupplierList } from "./pages/SupplierList"
import { AlterSupplierForm } from "./pages/AlterSupplierForm"


export function App() {

  return (
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/' element={<DefaultLayout/>}>
                <Route path="/newSupplierForm" element={<ProtectedLayout><NewSupplierForm/></ProtectedLayout>}/>
                <Route path="/supplierList" element={<ProtectedLayout><SupplierList/></ProtectedLayout>}/>
                <Route path="/alterSupplierForm" element={<ProtectedLayout><AlterSupplierForm/></ProtectedLayout>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider> 
      </AuthProvider>   
  )
}
