import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App';
import ErrorPage from './pages/ErrorPage';
/* import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { CalendarPage } from './pages/CalendarPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { TablePage } from './pages/TablePage';
import { SelectPage } from './pages/SelectPage'; */

export const AppRoutes = () => {
  return (
    <Router>
        <Switch>
            <Route exact path='/' component={ App } />
            <Route component={ ErrorPage  } />
        </Switch>
    </Router>
  )
}
