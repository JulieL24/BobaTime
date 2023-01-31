import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteNav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <SiteNav />
      <div className="container">
        <Routes>
          <Route path="/">
              {/* <Route path="" element={<LocationForm />} /> */}
          </Route>
        </Routes>
          <p className="text-center">
            Hello, world!
          </p>

      </div>
    </BrowserRouter>
  );
}

export default App;
