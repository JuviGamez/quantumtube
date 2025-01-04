import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import History from './pages/History';
import LikedVideos from './pages/LikedVideos';
import Subscriptions from './pages/Subscriptions';
import Channel from './pages/Channel';
import Shorts from './pages/Shorts';
import { Tour } from './components/Tour/Tour';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:videoId" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<History />} />
          <Route path="/liked" element={<LikedVideos />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/channel/:channelId" element={<Channel />} />
          <Route path="/shorts" element={<Shorts />} />
        </Routes>
      </Layout>
      <Tour />
    </Router>
  );
}

export default App;
