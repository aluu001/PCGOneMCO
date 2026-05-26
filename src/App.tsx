import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MyTasks from './pages/MyTasks';
import EligibilityReport from './pages/EligibilityReport';
import NewRequest from './pages/NewRequest';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MyTasks />} />
          <Route path="/task/:id" element={<EligibilityReport />} />
          <Route path="/new-request" element={<NewRequest />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
