import React from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Header from './components/Header';
import AuditReport from './pages/auditReport';

function App() {
  return (
    <div className="cms-react-boilerplate__container min-h-screen bg-gray-50">
      <Header />
      <TabLayout>
        <AuditReport title="Past Reports" />
      </TabLayout>
    </div>
  );
}

export default App;
