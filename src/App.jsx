import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DeedFormProvider } from './context/DeedFormContext';
import Navbar from './components/Navbar';
import WizardForm from './components/WizardForm';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('deed_app_logged_in') === 'true';
  });

  const handleLoginSuccess = () => {
    sessionStorage.setItem('deed_app_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('deed_app_logged_in');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <LanguageProvider>
      <DeedFormProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
          <Navbar onLogout={handleLogout} />
          <main className="flex-grow min-w-0">
            <WizardForm />
          </main>
        </div>
      </DeedFormProvider>
    </LanguageProvider>
  );
}

export default App;
