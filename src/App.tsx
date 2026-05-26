import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MyTasks from './pages/MyTasks';
import EligibilityReport from './pages/EligibilityReport';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MyTasks />} />
          <Route path="/task/:id" element={<EligibilityReport />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
