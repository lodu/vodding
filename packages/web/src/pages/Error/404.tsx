import { Button } from "@nextui-org/react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <Button
        variant="bordered"
        color="primary"
        className="mt-6"
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </Button>
    </div>
  );
}

export default NotFoundPage;
