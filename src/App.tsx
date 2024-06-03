import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
// import { AuthForm } from "./components/AuthForm"
import { AuthContextProvider } from "./context/AuthContext"
import { Root } from "./routes/Root"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
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
