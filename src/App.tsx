import { Provider } from "react-redux";
import { persistor, store } from "./store";
import RoutesApp from "./routes/RoutesApp";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RoutesApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
