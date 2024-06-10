"use client";
import { useEffect, useReducer ,useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

const initalState = {
  selectDate: 0,
  selectTime: 0,
  selectTrad: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, selectDate: action.payload };
    case 'SET_TIME':
      return { ...state, selectTime: action.payload };
    case 'SET_TRAD':
      return { ...state, selectTrad: action.payload };
    default:
      return state;
  }
};

function AdminHome() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useReducer(reducer, initalState);

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

  const handleSelect = (type) => (event) => {
    setProfile({ type, payload: event.target.value });
  };

  console.log(profile)



  return (
    <div className="h-screen bg-gray-300">
    <AppBar position="static">
      <Toolbar className="bg-black">
        <div className="flex gap-3 align-middle items-center ">
          <img
            src={profile.pictureUrl}
            alt="User profile"
            style={styles.profileImage}
            className=" "
          />
          <Typography component="div" className=" text-lg ms-5">
            {profile.displayName}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>

    <CardContent>
      <div className="flex gap-3 items-center justify-around align-middle mt-3 mb-4 ">
        <Button variant="contained">จองห้องเรียน</Button>
        <Button variant="contained">รายการจอง</Button>
      </div>
    </CardContent>
    <CardContent className="bg-white rounded-md">
      <div className="flex flex-col gap-5 items-center justify-around align-middle mt-5 bg-white">
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">วันที่จอง</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={profile.selectDate}
            label="วันที่จอง"
            onChange={handleSelect('SET_DATE')}
          >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">เวลาจอง</InputLabel>
          <Select
           labelId="time-select-label"
           id="time-select"
           value={profile.selectTime}
           label="เวลาจอง"
           onChange={handleSelect('SET_TIME')}
          >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">บัญชีเทรด</InputLabel>
          <Select
             labelId="trad-select-label"
             id="trad-select"
             value={profile.selectTrad}
             label="บัญชีเทรด"
             onChange={handleSelect('SET_TRAD')}
          >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <div className=" w-full flex gap-5 ">
          <div className="flex flex-col w-1/2 gap-3 items-center justify-around align-middle mt-3 ">
            <Button variant="contained" className="w-[120px]">
              จองห้องเรียน
            </Button>
            <Button variant="contained" className="w-[120px]">
              รายการจอง
            </Button>
          </div>
          <div className="flex flex-col bg-black rounded-md py-5 px-2 w-1/2 gap-3 justify-around align-middle ">
            <div className=" border-2  p-3">
              <Typography className="text-white text-left">
                ยอดจอง <span>9</span> / <span>10</span>
              </Typography>
              <Typography className="text-white">
                เหลือ <span>1</span> ที่นั้ง
              </Typography>
              <Typography className="text-white">
                เริ่ม <span>10/06/24</span>{" "}
              </Typography>
              <Typography className="text-white">
                ถึง <span>15/06/24</span>{" "}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  profileDetails: {
    textAlign: "center",
  },
};

export default AdminHome;
