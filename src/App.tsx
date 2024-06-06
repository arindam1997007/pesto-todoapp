import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import { LoginPage } from "./routes/login/LoginPage"
import { TaskPage } from "./routes/tasks/TaskPage"
import { protectedPageLoader } from "./routes/tasks/protectedPageLoader"
import { HomePage } from "./routes/homePage/HomePage"
import { ErrorPage } from "./routes/homePage/errorPage/ErrorPage"
import { Loader } from "./components/ui/loader/Loader"
import { CreateTaskPage } from "./routes/createTask/CreateTaskPage"
import { EditTaskPage } from "./routes/editTask/EditTaskPage"
import { editTaskPageLoader } from "./routes/editTask/editTaskLoader"

const router = createBrowserRouter([
	{
		element: (
			<AuthContextProvider>
				<Outlet />
			</AuthContextProvider>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
				loader: protectedPageLoader,
				children: [
					{
						index: true,
						Component: LoginPage,
					},
					{
						path: "tasks",
						Component: TaskPage,
					},
					{
						path: "create-task",
						Component: CreateTaskPage,
					},
					{
						path: "task/:taskId",
						loader: editTaskPageLoader,
						Component: EditTaskPage,
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
