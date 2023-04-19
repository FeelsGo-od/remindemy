import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)

    return (
        <div id="error-page">
            <h1>Page not found!</h1>
            <p>
                Error: <i>{error.statusText || error.message}</i>
            </p>
            <a href="/">Return to the main page</a>
        </div>
    )
}