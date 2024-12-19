import { RoutesApp } from './RoutesApp';
import Header from './components/Header';
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20">
        <RoutesApp />
      </main>
    </div>
  );
}

export default App;
