
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Protected from '../components/Protected';
import Landing from '../pages/Landing';

//public routes
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';

import PreCallScreen from '../routes/Call';

// protected routes
import RootLayout from '../layouts/RootLayout';
import Call from '../components/Call';
import Dashboard from '../routes/Dashboard';
import Settings from '../routes/Settings';
import Conversations from '../routes/Conversations';
import Login from '../components/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Landing/>} />
    <Route path="/terms" element={<TermsAndConditions/>} />
    <Route path="/privacy" element={<PrivacyPolicy/>} />
    <Route path='/login' element={<Login/>}/>

    <Route path="/app" element={<Protected><RootLayout/></Protected>} >
      <Route index element={<Dashboard/>} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="call" element={<PreCallScreen/>} />
      <Route path="conversations" element={<Conversations/>} />
      <Route path="settings" element={<Settings/>} />
    </Route>

    <Route path="/room/:roomId" element={<Call/>} />
    <Route path="*" element={<h1>Not Found</h1>} />

    </>
)
)