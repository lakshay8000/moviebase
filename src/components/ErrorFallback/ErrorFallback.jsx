import "./errorFallback.css";

function ErrorFallback({ error, resetErrorBoundary }) {   // we can pass these arguments and use them as mentioned in the package
    return (
        <div>
            <h2 className="error-text" >Something went wrong:</h2>
            <button onClick={resetErrorBoundary} > retry </button>   {/* Call resetErrorBoundary() to reset the error boundary and retry the render. */}
        </div>
    );
}

export default ErrorFallback;