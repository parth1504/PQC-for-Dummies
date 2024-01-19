import Page from "./Page";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wots from "./wots";
import Hors from "./Hors";
import Lamport from "./lamport";
import HorsAnimated from "./HorsAnimated";
import BitAnimation from "./text";
import _256bit from "./_256bit";
import Hash from "./hash";
import MerkleTreeComponent from "./merkleTree";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/256" element={<_256bit/>} />
        <Route path="/" element={<Hash/>} />

        <Route path="/ds" element={<Page/>} />
        <Route path="/lamport" element={<Lamport/>} />
        <Route path="/hors" element={<BitAnimation/>} />
        <Route path="/wots" element={<Wots/>} />
        <Route path="/merkletree" element={<MerkleTreeComponent/>} />

      </Routes>
    </Router>
  );
}

export default App;
