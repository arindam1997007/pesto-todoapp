import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
// import { AuthForm } from "./components/AuthForm"
import { AuthContextProvider } from "./context/AuthContext"
import { Root } from "./routes/Root"
import { ErrorPage } from "./routes/ErrorPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
])

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider
				router={router}
				fallbackElement={
					<p>
						<strong>Loading...</strong>
					</p>
				}
			/>
			{/* <AuthForm /> */}
		</AuthContextProvider>
	)
}

export default App
