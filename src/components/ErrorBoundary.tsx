import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
  isQuotaError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: "",
    isQuotaError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    let parsedMessage = error.message || "Something went wrong while syncing your data.";
    let isQuotaError = parsedMessage.toLowerCase().includes("quota exceeded");

    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed.error === "string") {
        parsedMessage = parsed.error;
        isQuotaError = parsedMessage.toLowerCase().includes("quota exceeded");
      }
    } catch {
      // Not a JSON error message
    }

    return {
      hasError: true,
      message: parsedMessage,
      isQuotaError,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: "", isQuotaError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center space-y-5">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900">
                {this.state.isQuotaError ? "Daily Free Limit Reached" : "Database Sync Notice"}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {this.state.isQuotaError
                  ? "Your Firestore free daily quota has been exceeded. Free tier limits automatically reset the next day."
                  : "We encountered a problem syncing with Firestore. Please reload and try again."}
              </p>
              <p className="text-[11px] font-mono text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100 break-words">
                {this.state.message}
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
