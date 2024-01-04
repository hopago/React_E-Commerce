import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { QueryClientProvider } from "react-query";
import { getQueryClient } from "./lib/react-query/queryClient";
import { ReactQueryDevtools } from 'react-query/devtools';
import GNB from "./pages/components/gnb";

function App() {
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GNB />
      {elem}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
