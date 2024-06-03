import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import { LoginPage } from "./routes/login/LoginPage"
import { TaskPage } from "./routes/tasks/TaskPage"
import { taskPageLoader } from "./routes/tasks/taskPageLoader"
import { HomePage } from "./routes/homePage/HomePage"
import { ErrorPage } from "./routes/homePage/errorPage/ErrorPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: LoginPage,
			},
			{
				path: "tasks",
				loader: taskPageLoader,
				Component: TaskPage,
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
