import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";

// read the documentaion of this package to know how to use these-
import { ErrorBoundary } from "react-error-boundary";    
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";

// import MovieDetails from "../pages/MovieDetails/MovieDetails";
// lazy load imports-
const MovieDetails = React.lazy(() => import("../pages/MovieDetails/MovieDetails"));


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={(
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {/* We can implement something here as resetting the state so that the error doesn't happen again. */}} >
                    <Suspense fallback={<div>Loading...</div>} >
                        <MovieDetails />
                    </Suspense>
                </ErrorBoundary>
            )} />
            <Route path="*" element={<Error />} />   {/* if path is invalid, we will navigate to error page */}
        </Routes>
    );
}

export default MainRoutes;
