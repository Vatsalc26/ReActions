export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            ReActions Demo
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                Test executable recipes for coding agents.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                This small Next.js + Tailwind app gives ReActions realistic
                places to insert buttons, verify browser behavior, and return
                final reports.
              </p>

              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-600">
                  Hero action area
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try adding an async CTA button here.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-400">Current Pack</p>
              <h2 className="mt-2 text-2xl font-bold">Frontend Buttons</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Async CTA, destructive confirm, copy, icon, toggle, floating
                action, and split menu buttons.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="mt-2 text-slate-600">
              This card is a good target for secondary buttons, toggles, or
              save actions.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Settings action area
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-red-700">Danger zone</h2>
            <p className="mt-2 text-slate-600">
              This card is a good target for destructive confirm buttons.
            </p>

            <div className="mt-6 rounded-2xl border border-dashed border-red-300 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Danger action area
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Footer action area — useful for secondary buttons, copy buttons, or
          split button menus.
        </footer>
      </section>
    </main>
  );
}
