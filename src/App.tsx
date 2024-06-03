import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import { AuthContextProvider } from "./context/AuthContext"
import { Root } from "./routes/Root"
import { ErrorPage } from "./routes/ErrorPage"
import { LoginPage } from "./routes/login/LoginPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: LoginPage,
			},
		],
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
		</AuthContextProvider>
	)
}

export default App
