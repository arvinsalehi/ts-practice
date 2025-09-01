import { ChakraProvider } from '@chakra-ui/react';
import { SearchForm } from './components/forms/SearchForm'
import { BuildStatusBar } from './components/ui/statusbar';
import { CountdownProvider } from './context/CountdownContext';

function App() {
  return (
    <ChakraProvider>
      <CountdownProvider>
        {localStorage.endTime && (
          <BuildStatusBar
            onOpenPopup={() => console.log('Popup opened')}
          />
        )}
        <SearchForm />
      </CountdownProvider>
    </ChakraProvider>

  )
}

export default App
