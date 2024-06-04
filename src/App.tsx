import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import { LoginPage } from "./routes/login/LoginPage"
import { TaskPage } from "./routes/tasks/TaskPage"
import { taskPageLoader } from "./routes/tasks/taskPageLoader"
import { HomePage } from "./routes/homePage/HomePage"
import { ErrorPage } from "./routes/homePage/errorPage/ErrorPage"
import { loginPageLoader } from "./routes/login/loginPageLoader"
import { Loader } from "./components/ui/loader/Loader"

const router = createBrowserRouter([
	{
		element: (
			<AuthContextProvider>
				<Outlet />
			</AuthContextProvider>
		),
		children: [
			{
				path: "/",
				element: <HomePage />,
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						loader: loginPageLoader,
						Component: LoginPage,
					},
					{
						path: "tasks",
						loader: taskPageLoader,
						Component: TaskPage,
					},
				],
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} fallbackElement={<Loader />} />
}

export default App
