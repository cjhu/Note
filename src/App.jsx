import { PrepareTimeline } from './components/PrepareTimeline';

function App() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="mx-auto flex max-w-[960px] flex-col gap-[24px] px-[16px] py-[24px]">
        <header className="flex flex-col gap-[8px]">
          <div className="flex flex-wrap items-center justify-between gap-[12px]">
            <h1 className="text-[22px] font-medium leading-[24px]">Prepare</h1>
            <span className="text-[12px] font-medium leading-[16px] text-[#6F6F6F]">Updated 6h ago</span>
          </div>
          <p className="max-w-[720px] text-[14px] font-normal leading-[20px] text-[#6F6F6F]">
            Responsive event list that adapts how dates are displayed based on the viewport width.
          </p>
        </header>

        <main>
          <PrepareTimeline />
        </main>
      </div>
    </div>
  );
}

export default App;

