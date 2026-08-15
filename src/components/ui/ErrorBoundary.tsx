import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090B] text-slate-100 flex items-center justify-center p-6 font-sans selection:bg-[#C56A4A]/30 selection:text-[#F4F4F6]">
          <div className="max-w-md w-full p-8 rounded-xl border border-[#27272A] bg-[#141418] shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C56A4A]/10 border border-[#C56A4A]/30 flex items-center justify-center text-[#C56A4A]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-display font-semibold text-[#F4F4F6]">
                Something went wrong
              </h1>
              <p className="text-sm text-[#9E9A93]">
                An unexpected interface error occurred. Please refresh the page to restore your session.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#C56A4A] hover:bg-[#D87B5B] text-white font-medium text-sm transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C56A4A] focus:ring-offset-2 focus:ring-offset-[#09090B]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
