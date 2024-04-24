import './App.css'
import Chat from './Components/chat/Chat'
import Details from './Components/details/Details'
import List from './Components/list/List'

function App() {

  return (
    <>
      <div className='h-full w-[80vw] flex py-10'>
        <List />
        <Chat />
        <Details />
      </div>
    </>
  )
}

export default App
