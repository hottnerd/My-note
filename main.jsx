import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./src/styles/main.css"
import { Provider, useDispatch } from 'react-redux'
import {store} from "./src/redux/store"
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { getUserData } from './src/redux/userSlice';
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const ENV = import.meta.env.ENV;

if (ENV === "production") {
  disableReactDevTools();
}

store.dispatch(getUserData());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App/>}/>
        </Routes>     
      </BrowserRouter>     
    </Provider>
  </React.StrictMode>,
)
