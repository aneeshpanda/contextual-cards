import Header from "./components/Header/Header.component";
import CardContainer from "./components/CardContainer/CardContainer.component";
import MessageStack from "./components/MessageStack/MessageStack.component";

import { MessageProvider } from "./context/Message.context";

import "./App.css";

function App() {
  return (
    <MessageProvider>
      <MessageStack />
      <div className="App">
        <Header />
        <CardContainer />
      </div>
    </MessageProvider>
  );
}

export default App;
