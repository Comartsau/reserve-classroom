"use client";
import { useReducer, useState, useEffect } from "react";
import { styled } from "@mui/system";
import { HeaderAPI } from "@/headerApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

import axios from "axios";
import {
  Button,
  CardContent as MuiCardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useProfile } from "../layout";

// Styled FormControl component
const CustomFormControl = styled(FormControl)(({ theme, disabled }) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    borderColor: disabled ? "red" : "inherit",
    borderWidth: disabled ? "1px" : "inherit",
    borderStyle: disabled ? "solid" : "inherit",
  },
}));

const initialState = {
  dateSearch: "",
  selectDate: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATESELECT":
      return { ...state, selectDate: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

function Reserve() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectDate, setSelectDate] = useState([]);
  const { profile } = useProfile();

  const handleFetchDate = async () => {
    const data = {
      user_id: profile?.userId || "",
      date: state?.dateSearch || "",
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/user/mybook`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      // console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SET_DATESELECT", payload: res?.data });
        const uniqueDates = [...new Set(res.data.map((item) => item.date))];
        setSelectDate(uniqueDates);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    handleFetchDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleReset = () => {
    dispatch({ type: "CLEAR" });
    handleFetchDate();
  };

  const handleDateSearch = (event) => {
    // console.log(event.target.value);
    const date = event.target.value;
    const formattedDate = date
      ? dayjs(date, "DD-MM-YYYY").format("YYYY-MM-DD")
      : null;
    dispatch({ type: "SET_DATE_SEARCH", payload: formattedDate });
  };


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
      <ToastContainer autoClose={2000} theme="colored" />
      <CardContent>
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
        <div className="flex flex-col  gap-3 items-center justify-around align-middle p-0 m-0  rounded-md  shadow-md  bg-white ">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <div className="mt-5">
              <CustomFormControl
                fullWidth
                size="small"
                // className="mt-3"
                // disabled={state.dateSearch}
              >
                <InputLabel>ค้นหาวันที่</InputLabel>
                <Select
                  id="date-select"
                  label="วันที่จอง"
                  className="w-auto sm:w-[250px]"
                  value={
                    state?.dateSearch === ""
                      ? ""
                      : dayjs(state?.dateSearch).format("DD-MM-YYYY")
                  }
                  onChange={handleDateSearch}
                >
                  {selectDate?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={dayjs(item).format("DD-MM-YYYY") || ""}
                    >
                      {dayjs(item).format("DD-MM-YYYY") || ""}
                    </MenuItem>
                  ))}
                </Select>
                <div className="flex justify-center mt-3">
                  <Button
                    variant="contained"
                    className="w-[200px]"
                    onClick={handleReset}
                  >
                    เคลียร์ค่า
                  </Button>
                
                </div>
              </CustomFormControl>
            </div>
            <div className="flex flex-col overflow-auto h-[50vh] ">
              <List>
                {state?.selectDate?.map((item, index) => (
                  <ListItem
                    key={index}
                    className="text-xs border-4 border-white bg-gray-200 "
                  >{`${index + 1}.  วันที่: ${dayjs(item?.date).format(
                    "DD-MM-YYYY"
                  )}  เวลา: ${item?.time_start} - ${
                    item?.time_end
                  } `}</ListItem>
                ))}
              </List>
            </div>
          </LocalizationProvider>
        </div>
      </CardContent>
    </div>
  );
}

export default Reserve;
