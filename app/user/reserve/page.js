"use client";
import { Button, CardContent, List, ListItem, Typography } from "@mui/material";
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
    <CardContent>
        
    <div className="bg-black rounded-sm">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", textAlign: "center" }}
          >
            ข้อมูลผู้เรียน
          </Typography>
        </div>
        <div className="flex flex-col p-4 gap-3">
          <Typography>ชื่อผู้เรียน</Typography>
          <List>
            {/* {data?.map((item, index) => (
              <ListItem key={index}>{item?.name}</ListItem>
            ))} */}
            <ListItem>aaaaa</ListItem>
            <ListItem>bbbbb</ListItem>
            <ListItem>ccccc</ListItem>
          </List>
        </div>

      </CardContent>
    </div>
  );
}

export default Reserve;
