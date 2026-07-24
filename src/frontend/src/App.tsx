import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { AboutPage } from "./pages/AboutPage";
import { ApplyPage } from "./pages/ApplyPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { InterviewsPage } from "./pages/InterviewsPage";
import { JobApplyPage } from "./pages/JobApplyPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileSetupPage } from "./pages/ProfileSetupPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ShiftsPage } from "./pages/ShiftsPage";
import { SignUpPage } from "./pages/SignUpPage";

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: () => {
    // RouteGuard handles auth check at runtime
  },
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});
const interviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/interviews",
  component: InterviewsPage,
});
const shiftsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shifts",
  component: ShiftsPage,
});
const applyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply",
  component: ApplyPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const jobApplyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/job-apply",
  component: JobApplyPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});
const profileSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile-setup",
  component: ProfileSetupPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  interviewsRoute,
  shiftsRoute,
  applyRoute,
  contactRoute,
  jobApplyRoute,
  loginRoute,
  signupRoute,
  profileSetupRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
