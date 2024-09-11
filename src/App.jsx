import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { UserProvider } from "./UserContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Content />
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
