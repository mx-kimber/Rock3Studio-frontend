import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Header />
        <Content />
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App;
