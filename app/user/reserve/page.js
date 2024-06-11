"use client";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {useEffect , useState} from "react";

function Reserve() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error("LIFF ID is not set in environment variables");
        }
        await liff.init({ liffId: liffId });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);

          // Set a cookie to indicate LIFF login
          document.cookie = "liff_token=1; path=/";
          document.cookie = "user_permition=user; path=/";

          // Hide the title bar in Line LIFF
          if (liff.isInClient()) {
            liff.ready.then(() => {
              liff.hide();
            });
          }
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  const handleHomePage = () => {
    router.push("/user");
  };

  return (
    <div>
      <Typography> Reserve Page</Typography>

      <Button variant="contained" onClick={handleHomePage}>
        Home Page
      </Button>
    </div>
  );
}

export default Reserve;
