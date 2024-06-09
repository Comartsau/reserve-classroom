"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminHome() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("login");
    if (userRole === "admin") {
      document.cookie = "token=admin";
      setRole("admin");
    } else {
      router.push("/"); // Redirect to login if not admin
    }

    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  if (role !== "admin") {
    return null; // Render nothing until role is confirmed
  }

  return <div>Admin</div>;
}

export default AdminHome;
