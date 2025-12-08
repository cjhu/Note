import './App.css';
import { PrepareTimeline } from './components/PrepareTimeline';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header prepare-header">
        <div className="app-title-row">
          <div>
            <p className="eyebrow">Demo</p>
            <h1>Prepare</h1>
          </div>
          <span className="updated-pill">Updated 6h ago</span>
        </div>
        <p className="subtitle">
          Responsive event list that adapts how dates are displayed based on the viewport width.
        </p>
      </header>

      <main className="prepare-main">
        <PrepareTimeline />
      </main>
    </div>
  );
}

export default App;

