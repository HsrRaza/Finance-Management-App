import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] w-full flex flex-col items-center justify-center p-6 bg-red-500/5 rounded-2xl border border-red-500/20 text-center">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Something went wrong</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mt-1 mb-4">
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
