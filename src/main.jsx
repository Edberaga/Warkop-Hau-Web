import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'react-toastify/dist/ReactToastify.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './timepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss'; 

createRoot(document.getElementById('root')).render(
  <App />,
)
