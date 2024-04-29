import "./App.css";
import Chat from "./Components/chat/Chat";
import Details from "./Components/details/Details";
import List from "./Components/list/List";
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";

function App() {
  const user = false;

  return (
    <>
      <div className="h-full w-[85vw] flex py-10">
        {user ? (
          <>
            <List />
            <Chat />
            <Details />
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
}

export default App;
