import Seo from "../comps/layout/SEO";

export default function Custom404() {
  return (
    <div className="flex h-[calc(100vh-305px)] py-2">
      <Seo title="404 - Page Not Found" />
      <main className="flex flex-1 items-center justify-center px-20 text-center">
        <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      </main>
    </div>
  );
}
