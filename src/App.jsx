import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DeedFormProvider } from './context/DeedFormContext';
import Navbar from './components/Navbar';
import WizardForm from './components/WizardForm';
import Login from './components/Login';
import { clearSession, getSessionUser, isLoggedIn } from './services/authService';

function App() {
  const [sessionUser, setSessionUser] = useState(() => (isLoggedIn() ? getSessionUser() : null));

  const handleLoginSuccess = (user) => {
    setSessionUser(user);
  };

  const handleLogout = async () => {
    await clearSession();
    setSessionUser(null);
  };

  return (
    <LanguageProvider>
      {!sessionUser ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DeedFormProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
            <Navbar onLogout={handleLogout} sessionUser={sessionUser} />
            <main className="flex-grow min-w-0">
              <WizardForm />
            </main>
          </div>
        </DeedFormProvider>
      )}
    </LanguageProvider>
  );
}

export default App;
