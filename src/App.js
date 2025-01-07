import React from 'react';
import './App.scss';
import TabLayout from './components/TabLayout';
import Contacts from './pages/contacts';
import Companies from './pages/companies';
import Deals from './pages/deals';
import Tickets from './pages/tickets';
import Header from './components/Header';

function App() {
  return (
    <div className="cms-react-boilerplate__container min-h-screen bg-gray-50">
      <Header />
      <TabLayout>
       <Contacts title="Contacts" />
       <Companies title="Companies" />
       <Deals title="Deals" />
       <Tickets title="Tickets" />
      </TabLayout>
    </div>
  );
}

export default App;
