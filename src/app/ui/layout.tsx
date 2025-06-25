import Gnb from "@/ui/gnb/Gnb";
import Breadcrumb from "@/ui/breadcrumb/Breadcrumb";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Gnb />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <Breadcrumb />
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Admin 템플릿
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
