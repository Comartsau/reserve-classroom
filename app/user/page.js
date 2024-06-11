/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import liff from "@line/liff";
import {
  AppBar,
  Button,
  CardContent as MuiCardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Modal,
  Box,
} from "@mui/material";

import { styled } from "@mui/system";

const initalState = {
  selectDate: "",
  selectTime: "",
  selectTrad: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return {
        ...state,
        selectDate: action.payload,
        selectTime: "",
        selectTrad: "",
      };
    case "SET_TIME":
      return { ...state, selectTime: action.payload, selectTrad: "" };
    case "SET_TRAD":
      return { ...state, selectTrad: action.payload };
    case "RESET":
      return initalState;
    default:
      return state;
  }
};

// Styled FormControl component
const CustomFormControl = styled(FormControl)(({ theme, disabled }) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    borderColor: disabled ? "red" : "inherit",
    borderWidth: disabled ? "1px" : "inherit",
    borderStyle: disabled ? "solid" : "inherit",
  },
}));

const CardContent = styled(MuiCardContent)({
  // backgroundColor: 'white',
  borderRadius: "10px",
  padding: "10px",
  // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "320px",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const User = () => {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initalState);
  const router = useRouter();
  const [openModalReserve, setOpenModalReserve] = useState(false);

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

  if (!profile) {
    return (
      <div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  const handleSelect = (type) => (event) => {
    dispatch({ type, payload: event.target.value });
  };

  const handleReservePage = () => {
    router.push("/user/reserve");
  };
  const handleUserPage = () => {
    router.push("/user");
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleModalReserve = () => {
    if (state.selectDate && state.selectTime && state.selectTrad) {
      setOpenModalReserve(!openModalReserve);
    } else {
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="h-screen bg-gray-300  p-2">
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

      <div className="flex gap-3 items-center  align-middle p-2 mt-2 ">
        <Button variant="contained" onClick={handleUserPage}>
          จองห้องเรียน
        </Button>
        <Button variant="contained" onClick={handleReservePage}>
          รายการจอง
        </Button>
      </div>
      <CardContent>
        <div className="flex flex-col gap-3 items-center justify-around align-middle px-6 py-6  rounded-md  shadow-md  bg-white">
          <CustomFormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">วันที่จอง</InputLabel>
            <Select
              labelId="date-select-label"
              id="date-select"
              value={state.selectDate}
              label="วันที่จอง"
              onChange={handleSelect("SET_DATE")}
              className=" border-green-300"
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </CustomFormControl>
          <CustomFormControl
            fullWidth
            size="small"
            disabled={state.selectDate === ""}
          >
            <InputLabel id="demo-simple-select-label">เวลาจอง</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={state.selectTime}
              label="เวลาจอง"
              onChange={handleSelect("SET_TIME")}
              className={`${
                state.selectTime === "" ? "border-red-300" : "border-green-300"
              }`}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </CustomFormControl>
          <CustomFormControl
            fullWidth
            size="small"
            disabled={state.selectDate === "" || state.selectTime === ""}
          >
            <InputLabel id="demo-simple-select-label">บัญชีเทรด</InputLabel>
            <Select
              labelId="trad-select-label"
              id="trad-select"
              value={state.selectTrad}
              label="บัญชีเทรด"
              onChange={handleSelect("SET_TRAD")}
              className={`${
                state.selectTrad === "" ? "border-red-300" : "border-green-300"
              }`}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </CustomFormControl>
          <div className=" w-full flex gap-2 mt-2 ">
            <div className="flex flex-col w-[48%] gap-3  align-middle  ">
              <Button
                variant="contained"
                className="w-full"
                onClick={handleReset}
              >
                เลือกใหม่
              </Button>
              <Button
                variant="contained"
                className="w-full"
                onClick={handleModalReserve}
              >
                จอง
              </Button>
            </div>
            <div className="flex flex-col bg-black rounded-md py-2  w-[52%] gap-3 justify-around align-middle ">
              <div className="  p-2">
                <div className="border-2 p-1">
                  <Typography className="text-white text-left ">
                    ยอดจอง <span>9</span> / <span>10</span>
                  </Typography>
                </div>
                <div className=" ps-2 mt-2">
                  <Typography
                    className="text-white  "
                    sx={{ fontSize: "12px" }}
                  >
                    เหลือ <span>1</span> ที่นั้ง
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white " sx={{ fontSize: "12px" }}>
                    เริ่ม <span>10/06/24</span>{" "}
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white " sx={{ fontSize: "12px" }}>
                    ถึง <span>15/06/24</span>{" "}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Modal
        open={openModalReserve}
        onClose={handleModalReserve}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <div className=" bg-black rounded-sm">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "white", textAlign: "center" }}
            >
              สรุปข้อมูลการจองห้องเรียน
            </Typography>
          </div>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            วันที่จอง : {state.selectDate}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            เวลาจอง : {state.selectTime}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            บัญชีเทรด : {state.selectTrad}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleModalReserve} sx={{ mr: 1, color: "red" }}>
              ยกเลิก
            </Button>
            <Button variant="contained">ยืนยัน</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

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

export default User;
