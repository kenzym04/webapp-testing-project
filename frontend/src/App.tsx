import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the Web App Testing Project</h1>
        <Routes>
          <Route path="/" element={<TodoList />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;