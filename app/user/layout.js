/* eslint-disable @next/next/no-img-element */
import {
  AppBar,
  Button,
  CardContent as MuiCardContent,
  Toolbar,
  Typography,
} from "@mui/material";

const LayoutUser = ({
  children,
  profile,
  handleUserPage,
  handleReservePage,
}) => (
  <div className="h-screen bg-gray-300 p-2">
    <AppBar position="static">
      <Toolbar className="bg-black">
        <div className="flex gap-3 align-middle items-center">
          <img
            src={profile.pictureUrl}
            alt="User profile"
            style={styles.profileImage}
          />
          <Typography component="div" className="text-lg ms-5">
            {profile.displayName}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>

    <div className="flex gap-3 items-center align-middle p-2 mt-2">
      <Button variant="contained" onClick={handleUserPage}>
        จองห้องเรียน
      </Button>
      <Button variant="contained" onClick={handleReservePage}>
        รายการจอง
      </Button>
    </div>

    {children}
  </div>
);

export default LayoutUser;
