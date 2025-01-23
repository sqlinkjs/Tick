import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./provider/authProvider";
import Routes from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
