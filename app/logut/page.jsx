import React, { useEffect } from "react";

function page() {
  const handelLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error();
      }
      dispatch(logout());
      router.push("/");
      toast.success("Logout successfull");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handelLogout();
  }, []);
  return <div>logging you out...</div>;
}

export default page;
