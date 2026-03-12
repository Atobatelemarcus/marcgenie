import { Outlet } from "react-router-dom";
import PublicHeader from "../components/ui/PublicHeader";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
