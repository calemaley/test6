import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNewToday() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin-rank/dashboard/recent?date=today", { replace: true });
  }, [navigate]);
  return null;
}
