import { Fragment } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { publicRoutes } from '~/rourtes'; // biến cấu hình router
import DefaultLayout from '~/components/Layout/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            
            const Page = route.component; // đặt biến để chuyển thành Components (trong bài JSX) vì bên dưới thằng element nó nhận vào là 1 Component
            let Layout = DefaultLayout
            if(route.layout){
              Layout = route.layout
            }else if(route.layout ===null){
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
