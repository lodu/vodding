import { Alert } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorExplainedProps {
  title: string;
  body: string;
  redirectPath?: string;
  delay?: number;
}

const updateInterval = 10;

function ErrorExplained({
  title,
  body,
  redirectPath,
  delay = 5000,
}: ErrorExplainedProps) {
  const [_, setProgress] = useState(delay);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / delay) * 100, 100);
        setProgress(newProgress);
        if (elapsedTime >= delay) {
          clearInterval(timer);
          navigate(redirectPath);
        }
      }, updateInterval);

      return () => clearInterval(timer);
    }
  }, [navigate, redirectPath, delay]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Alert
          title={title}
          color="success"
          description={body}
          variant="faded"
        />
      </div>
    </div>
  );
}

export default ErrorExplained;
