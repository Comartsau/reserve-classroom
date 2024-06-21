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
  TextField,
  Box,
  Modal,
} from "@mui/material";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { styled } from "@mui/system";
import { HeaderAPI } from "@/headerApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

import { useProfile } from "./layout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  date: null,
  dateSearch: "",
  selectTime: [],
  selectDate: [],
  selectedTimeId: "",
  selectedTrad: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATESELECT":
      return { ...state, selectDate: action.payload };
    case "SET_TIMESELECT":
      return { ...state, selectTime: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "SET_SELECTED_TIME_Id":
      return { ...state, selectedTimeId: action.payload };
    case "SET_SELECTED_TRAD":
      return { ...state, selectedTrad: action.payload };
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
  borderRadius: "10px",
  padding: "10px",
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

const MySwal = withReactContent(Swal);

const User = () => {
  const { profile } = useProfile();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModalReserve, setOpenModalReserve] = useState(false);
  const [data, setData] = useState([]);
  const [dataBlack, setDataBlack] = useState({});
  const [disableReserve, setDisableReserve] = useState(1);
  const [token, setToken] = useState("");

  const handleReset = () => {
    dispatch({ type: "CLEAR" });
    setDisableReserve(1);
    setData([]);
    handleFetchDate();
  };

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
      console.log(res)
      if (res.status === 200) {
        dispatch({ type: "SET_DATESELECT", payload: res?.data });
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      // console.log(error);
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    }
  };

  // useEffect(() => {
  //   handleFetchDate();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      handleFetchDate();
    } else {
      const interval = setInterval(() => {
        const tokenCheck = localStorage.getItem("Token");
        if (tokenCheck) {
          clearInterval(interval);
          handleFetchDate();
        }
      }, 2000);
    }
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
      console.log(res)
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
    if (state?.dateSearch) {
      handleFetchTimeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleSelectTimeChange = (event) => {
    dispatch({ type: "SET_SELECTED_TIME_Id", payload: event.target.value });
    console.log("aaaaa")
    handleFetchDetail(event.target.value);
  };

  const handleFetchDetail = async (id) => {
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
      console.log(` bbbbb ${res}`);
      if (res.status === 200) {
        setData(res?.data);
        setDataBlack(res?.data?.items?.data[0]);
        setDisableReserve(
          Number(res?.data?.sum_count) - Number(res?.data?.count)
        );
        console.log(disableReserve);
        console.log(res?.data?.sum_count);
        console.log(res?.data?.count);
        console.log(res?.data?.items?.data[0]);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error(error);
    }
  };



  const handleModalReserve = () => {
    if (state.dateSearch && state.selectTime && state.selectedTrad) {
      setOpenModalReserve(!openModalReserve);
    } else {
      toast.error("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }
  };

  const handleSendReserve = async () => {
    const data = {
      user_id: profile?.userId || "",
      name: profile?.displayName || "",
      image: profile?.pictureUrl || "",
      date: state?.dateSearch || "",
      booking_id: Number(state?.selectedTimeId) || "",
      trade: state?.selectedTrad || "",
    };

    try {
      // console.log(data);

      // แสดง SweetAlert2 เพื่อแสดงการโหลด และปรับ z-index ให้สูงกว่า modal
      MySwal.fire({
        title: "Loading...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading();
          // Adjust z-index here
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) {
            swalContainer.style.zIndex = "9999";
          }
        },
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/user/booking`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );

      // หน่วงเวลา 1.5 วินาที
      setTimeout(() => {
        if (res.status === 200) {
          MySwal.close();
          toast.success(res.data.message);
          handleReset();
          setOpenModalReserve(!openModalReserve);
        } else {
          MySwal.close();
          toast.error("Error fetching data");
        }
      }, 1500);
    } catch (error) {
      MySwal.close();
      toast.error(error.response.data);
    }
  };

  return (
    <div className="h-screen bg-gray-300">
      <ToastContainer autoClose={2000} theme="colored" />
      <CardContent>
        <div className="flex flex-col gap-3 items-center justify-around px-6 py-6 rounded-md shadow-md bg-white">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <CustomFormControl
              fullWidth
              size="small"
              disabled={state?.dateSearch}
            >
              <InputLabel>วันที่</InputLabel>
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
            <InputLabel>เวลาจอง</InputLabel>
            <Select
              id="time-select"
              label="เวลาจอง"
              className="w-auto sm:w-[250px]"
              value={state?.selectedTimeId || ""}
              onChange={handleSelectTimeChange}
            >
              {state.selectTime?.map((item, index) => (
                <MenuItem key={index} value={item?.id || ""}>
                  เวลา: {`${item?.time_start} - ${item?.time_end}`}
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
              value={state?.selectedTrad}
              onChange={(e) =>
                dispatch({ type: "SET_SELECTED_TRAD", payload: e.target.value })
              }
            />
          </CustomFormControl>
          <div className="w-full flex gap-2 mt-2">
            <div
              className="flex flex-col  rounded-md py-2 w-[52%] gap-3 justify-around "
              style={
                disableReserve == 0
                  ? { backgroundColor: "#fc9f9f" }
                  : { backgroundColor: "#ced6e0" }
              }
            >
              <div className="p-2 text-center">
                <div className="border-2 border-black rounded-md p-1">
                  <Typography className=" text-left">
                    ยอดจอง <span>{data?.sum_count || 0}</span> /{" "}
                    <span>{data?.count || 0}</span>
                  </Typography>
                </div>
                <div className="ps-2 mt-2 w-full  ">
                  <Typography className="" sx={{ fontSize: "14px" }}>
                    เหลือ{" "}
                    <span>
                      {data?.count && data?.sum_count
                        ? Number(data?.count) - Number(data?.sum_count)
                        : 0}
                    </span>{" "}
                    ที่นั่ง
                  </Typography>
                </div>
                {/* <div className="ps-2">
                  <Typography className="text-white" sx={{ fontSize: "12px" }}>
                    เวลาเริ่ม <span>{dataBlack?.time_start}</span>
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white" sx={{ fontSize: "12px" }}>
                    เวลาสิ้นสุด <span>{dataBlack?.time_end}</span>
                  </Typography>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col w-[48%] gap-3">
              <Button
                variant="contained"
                className="w-full"
                onClick={handleReset}
                sx={{
                  backgroundColor: "#df9e10",
                  color: "#fff",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#c98e0e", // สีเมื่อ hover
                  },
                }}
              >
                เลือกใหม่
              </Button>
              <Button
                variant="contained"
                className="w-full"
                onClick={handleModalReserve}
                disabled={disableReserve == 0 ? true : false}
                sx={{
                  backgroundColor: "#093165",
                  color: "#fff",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#062a51", // สีเมื่อ hover
                  },
                }}
              >
                จอง
              </Button>
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
            วันที่จอง : {state.dateSearch}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            เวลาจอง : {`${dataBlack?.time_start} - ${dataBlack?.time_end} `}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            บัญชีเทรด : {state.selectedTrad}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleModalReserve} sx={{ mr: 1, color: "red" }}>
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              onClick={handleSendReserve}
              sx={{
                backgroundColor: "#093165",
                color: "#fff",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#062a51", // สีเมื่อ hover
                },
              }}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default User;
