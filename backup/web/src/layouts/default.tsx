import { Link } from "@nextui-org/link";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-1">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal={true}
          className="flex items-center gap-1 text-xs text-current"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="source"
        >
          <span className="text-default-600">Made for</span>
          <p className="text-primary">{window.location.hostname}</p>
        </Link>
      </footer>
    </div>
  );
}

export default DefaultLayout;
