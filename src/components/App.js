import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SellerModal from './SellerModal';
import Productpopup from './Productpopup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/seller/:userid" component={SellerModal} />
        {/* อื่น ๆ */}
      </Switch>
    </Router>
  );
}

export default App;
