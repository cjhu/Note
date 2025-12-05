import './App.css';
import { NoteDiffExample } from './components/NoteDiffExample';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Prototype</p>
        <h1>Unified Note Diff</h1>
        <p className="subtitle">
          Latest text by default. Toggle “Show changes” to reveal inline add/delete/replace markers with hover/tap tooltips.
        </p>
      </header>

      <main>
        <NoteDiffExample />
      </main>
    </div>
  );
}

export default App;

