import Page from "./DigitalSignature";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wots from "./wots";
import Hors from "./Hors";
import Lamport from "./lamport";
import HorsAnimated from "./HorsAnimated";
import BitAnimation from "./text";
import _256bit from "./_256bit";
import Hash from "./hash";
import MerkleTreeComponent from "./merkleTree";
import SpaceTime from "./spaceTime";
import SpaceTime2 from "./spaceTime2";
import Sphincs from "./sphincs";
import TreeOfTrees from "./TreeOfTrees";
import CryptoComparison from "./CryptoComparison";
import LatticeCryptography from "./latticecryptography";
import SVPCVP from "./svpcvp";
import SVPCVPTWO from "./svpcvptwo";
import AverageVsWorstCase from "./averagevsworstcase";
import SIS from "./sis";
import LearningWithErrors from "./learningwitherrors";
import PolynomialSampling from "./polynomialsampling";
import DilithiumKeyGeneration from "./dilithiumkeygen";
import DilithiumSigningSimulation from "./dilithiumsigning";
import DilithiumVerification from "./dilithiumverification";
import DilithiumDemo from "./dilithiumdemo";
import FiatShamir from "./fiatshamir";

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
        <Route path="/spaceTime" element={<SpaceTime/>} />
        <Route path="/spaceTime2" element={<SpaceTime2/>} />
        <Route path="/sphincs" element={<Sphincs/>} />       
        <Route path="/treeoftrees" element={<TreeOfTrees/>} />
        <Route path="/latticecryptography" element={<LatticeCryptography/>} />
        <Route path="/svpcvp" element={<SVPCVP/>} />
        <Route path="/svpcvptwo" element={<SVPCVPTWO/>} />
        <Route path="/cryptocomparison" element={<CryptoComparison/>} />
        <Route path="/averagevsworstcase" element={<AverageVsWorstCase/>} />
        <Route path="/sis" element={<SIS/>} />
        <Route path="/lwe" element={<LearningWithErrors/>} />
        <Route path="/polynomialsampling" element={<PolynomialSampling/>} />
        <Route path="/dilithiumkeygen" element={<DilithiumKeyGeneration/>} />
        <Route path="/dilithiumsigning" element={<DilithiumSigningSimulation/>} />
        <Route path="/dilithiumverification" element={<DilithiumVerification/>} />
        <Route path="/dilithiumdemo" element={<DilithiumDemo/>} />
        <Route path="/fiatshamir" element={<FiatShamir/>} />
      </Routes>
    </Router>
  );
}

export default App;
