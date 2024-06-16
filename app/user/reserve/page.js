"use client";
import { CardContent, List, ListItem, Typography } from "@mui/material";

function Reserve() {
  // useEffect(() => {
  //   const initializeLiff = async () => {
  //     try {
  //       const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  //       if (!liffId) {
  //         throw new Error("LIFF ID is not set in environment variables");
  //       }
  //       await liff.init({ liffId: liffId });
  //       if (liff.isLoggedIn()) {
  //         const userProfile = await liff.getProfile();
  //         setProfile(userProfile);

  //         // Set a cookie to indicate LIFF login
  //         document.cookie = "liff_token=1; path=/";
  //         document.cookie = "user_permition=user; path=/";

  //         // Hide the title bar in Line LIFF
  //         if (liff.isInClient()) {
  //           liff.ready.then(() => {
  //             liff.hide();
  //           });
  //         }
  //       } else {
  //         liff.login();
  //       }
  //     } catch (error) {
  //       console.error("LIFF Initialization failed:", error);
  //     }
  //   };

  //   initializeLiff();
  // }, []);

  return (
    <div>
      <CardContent>
        <div className="flex flex-col gap-3 items-center justify-around align-middle  py-6  rounded-md  shadow-md  bg-white">
          <div className="w-full bg-black rounded-sm">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "white", textAlign: "center" }}
            >
              ข้อมูลรายการจอง
            </Typography>
          </div>
          <div className="flex flex-col p-0 m-0">
            <List>
              {/* {data?.map((item, index) => (
              <ListItem key={index}>{item?.name}</ListItem>
            ))} */}
              <ListItem>aaaaa</ListItem>
              <ListItem>bbbbb</ListItem>
              <ListItem>ccccc</ListItem>
            </List>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default Reserve;
