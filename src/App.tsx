import "./App.css";
import { DATA, SELECT_ALL, SUB_SELECT_ALL } from "./data";
import Filter from "./componets/Filter";

function App() {  
  return (
    <div className="App">
      <Filter
        data={DATA}
        selectAll={SELECT_ALL}
        subSelectAll={SUB_SELECT_ALL}
      />
    </div>
  );
}

export default App;