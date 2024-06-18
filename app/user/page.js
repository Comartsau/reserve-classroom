/* eslint-disable @next/next/no-img-element */
"use client";
import { useReducer, useState, useEffect } from "react";
import {
  Button,
  CardContent as MuiCardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";

import axios from "axios";

import { styled } from "@mui/system";
import { HeaderAPI } from "@/headerApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const initalState = {
//   selectDate: "",
//   selectTrad: "",
//   selectTime: "",
//   dateSearch: null,
// };

const initialState = {
  date: null,
  dateSearch: "",
  selectTime: [],
  selectDate: [],
  selectedTimeId: "",
  selectedDateId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATESELECT":
      return { ...state, selectDate: action.payload };
    case "SET_TIMESELECT":
      return { ...state, selectTime: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDateId: action.payload };
    case "SET_SELECTED_TIME":
      return { ...state, selectedTimeId: action.payload };
    case "CLEAR":
      return initialState;
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

const User = ({ profile }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModalReserve, setOpenModalReserve] = useState(false);
  const [data, setData] = useState([]);
  const [dataBlack, setDataBlack] = useState({});

  const handleSelect = (type) => (event) => {
    dispatch({ type, payload: event.target.value });
  };

  const handleReset = () => {
    dispatch({ type: "CLEAR" });
    handleFetchDate();
  };

  // const handleModalReserve = () => {
  //   if (state.selectDate && state.selectTime && state.selectTrad) {
  //     setOpenModalReserve(!openModalReserve);
  //   } else {
  //     alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
  //   }
  // };

  const handleDateSearch = (event) => {
    const date = event.target.value;
    const formattedDate = date
      ? dayjs(date, "DD-MM-YYYY").format("YYYY-MM-DD")
      : null;
    dispatch({ type: "SET_DATE_SEARCH", payload: formattedDate });
  };

  const handleFetchDate = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/user/date`,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        dispatch({ type: "SET_DATESELECT", payload: res?.data });
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.log(error);
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    handleFetchDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchTimeUser = async () => {
    const data = {
      date: state?.dateSearch,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report/search/date`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        dispatch({ type: "SET_TIMESELECT", payload: res?.data });
      } else {
        toast.error("Error fetching data");
      }
    } catch {
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    handleFetchTimeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleSelectTimeChange = (event) => {
    dispatch({ type: "SET_SELECTED_TIME", payload: event.target.value });
    handleFetchDetail(event.target.value);
  };

  const handleFetchDetail = async (id) => {
    console.log(state.selectedTimeId);
    const data = {
      date: state?.dateSearch || "",
      id: id || "",
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report/users`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );

      if (res.status === 200) {
        setData(res?.data);
        setDataBlack(res.data.data[0]);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // const handleFetchUser = async () => {
  //   const data = {
  //     user_id: "",
  //     date: state?.dateSearch || "",
  //     id: state?.selectedTimeId || "",
  //   };
  //   console.log(data);
  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/api/users`,
  //       data,
  //       { ...HeaderAPI(localStorage.getItem("Token")) }
  //     );
  //     if (res.status === 200) {
  //       setData(res?.data); //
  //     } else {
  //       toast.error("Error fetching data");
  //     }
  //   } catch {
  //     toast.error("ดึงข้อมูลไม่สำเร็จ");
  //   }
  // };

  console.log(state.dateSearch);

  return (
    <div className="h-screen bg-gray-300  ">
      <ToastContainer autoClose={2000} theme="colored" />
      <CardContent>
        <div className="flex flex-col gap-3 items-center justify-around align-middle px-6 py-6  rounded-md  shadow-md  bg-white">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <CustomFormControl
              fullWidth
              size="small"
              disabled={state.dateSearch}
            >
              <InputLabel>วันที่</InputLabel>
              <Select
                id="date-select"
                label="วันที่จอง"
                className=" w-auto  sm:w-[250px]"
                value={
                  state?.dateSearch == ""
                    ? ""
                    : dayjs(state?.dateSearch).format("DD-MM-YYYY")
                }
                disabled={state.dateSearch}
                onChange={handleDateSearch}
              >
                {state.selectDate?.map((item, index) => (
                  <MenuItem key={index} value={item?.date || ""}>
                    {item?.date || ""}
                  </MenuItem>
                ))}
              </Select>
            </CustomFormControl>
          </LocalizationProvider>
          <CustomFormControl
            fullWidth
            size="small"
            disabled={!state.dateSearch}
          >
            <InputLabel id="demo-simple-select-label">เวลาจอง</InputLabel>
            <Select
              id="date-select"
              label="วันที่จอง"
              className=" w-auto  sm:w-[250px]"
              value={state?.selectedTimeId || ""}
              onChange={handleSelectTimeChange}
            >
              {state.selectTime?.map((item, index) => (
                <MenuItem key={index} value={item?.id || ""}>
                  เวลา: {`${item?.time_start} - ${item?.time_end} `}
                </MenuItem>
              ))}
            </Select>
          </CustomFormControl>
          <CustomFormControl
            fullWidth
            size="small"
            disabled={!state.dateSearch || !state.selectedTimeId}
          >
            <TextField
              label="บัญชีเทรด"
              type="text"
              size="small"
              className="w-full"
              disabled={!state.dateSearch || !state.selectedTimeId}
              onChange={(e) =>
                dispatch({ type: "SET_COUNT", payload: e.target.value })
              }
            />
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
                // onClick={() => handleFetchUser()}
              >
                จอง
              </Button>
            </div>
            <div className="flex flex-col bg-black rounded-md py-2  w-[52%] gap-3 justify-around align-middle ">
              <div className="  p-2">
                <div className="border-2 p-1">
                  <Typography className="text-white text-left ">
                    ยอดจอง <span>{data?.sum_count || 0}</span> /{" "}
                    <span>{data?.count || 0}</span>
                  </Typography>
                </div>
                <div className=" ps-2 mt-2">
                  <Typography
                    className="text-white  "
                    sx={{ fontSize: "12px" }}
                  >
                    เหลือ{" "}
                    <span>
                      {data?.count && data?.sum_count
                        ? Number(data?.count) - Number(data?.sum_count)
                        : 0}
                    </span>{" "}
                    ที่นั่ง
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white " sx={{ fontSize: "12px" }}>
                    เวลาเริ่ม <span> {dataBlack?.time_start}</span>{" "}
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white " sx={{ fontSize: "12px" }}>
                    เวลาสิ้นสุด <span> {dataBlack?.time_end}</span>{" "}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* <Modal
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
      </Modal> */}
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
