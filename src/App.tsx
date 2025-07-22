import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Admin from './pages/Admin';
import WriteBlog from './pages/WriteBlog';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Router>
      <div className="bg-warm-gray min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/write" element={<WriteBlog />} />
            <Route path="/admin/write/:id" element={<WriteBlog />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;