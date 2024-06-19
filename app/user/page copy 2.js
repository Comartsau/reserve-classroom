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
  selectedTimeName: "",
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
    case "SET_SELECTED_TIME_Name":
      return { ...state, selectedTimeName: action.payload };
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

const User = () => {
  const { profile } = useProfile();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModalReserve, setOpenModalReserve] = useState(false);
  const [data, setData] = useState([]);
  const [dataBlack, setDataBlack] = useState({});

  // const handleSelect = (type) => (event) => {
  //   dispatch({ type, payload: event.target.value });
  // };

  const handleReset = () => {
    dispatch({ type: "CLEAR" });
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
      if (res.status === 200) {
        dispatch({ type: "SET_DATESELECT", payload: res?.data });
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
    console.log(state.dateSearch);
    if (state?.dateSearch) {
      handleFetchTimeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleSelectTimeChange = (event) => {
    // dispatch({ type: "SET_SELECTED_TIME_Name", payload: selectedTimeName });
    dispatch({ type: "SET_SELECTED_TIME_Id", payload: event.target.value });
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

  const handleModalReserve = () => {
    if (state.dateSearch && state.selectTime && state.selectedTrad) {
      setOpenModalReserve(!openModalReserve);
    } else {
      alert("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }
  };

  console.log(state.selectedTimeName)
  return (
    <div className="h-screen bg-gray-300">
      <ToastContainer autoClose={2000} theme="colored" />
      <CardContent>
        <div className="flex flex-col gap-3 items-center justify-around px-6 py-6 rounded-md shadow-md bg-white">
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
                <MenuItem
                  key={index}
                  value={item?.id || ""}
                  onChange={() =>
                    dispatch({
                      type: "SET_SELECTED_TIME_Name",
                      payload: ` ${item?.time_start} - ${item?.time_end}`,
                    })
                  }
                >
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
              onChange={(e) =>
                dispatch({ type: "SET_SELECTED_TRAD", payload: e.target.value })
              }
            />
          </CustomFormControl>
          <div className="w-full flex gap-2 mt-2">
            <div className="flex flex-col w-[48%] gap-3">
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
            <div className="flex flex-col bg-black rounded-md py-2 w-[52%] gap-3 justify-around">
              <div className="p-2">
                <div className="border-2 p-1">
                  <Typography className="text-white text-left">
                    ยอดจอง <span>{data?.sum_count || 0}</span> /{" "}
                    <span>{data?.count || 0}</span>
                  </Typography>
                </div>
                <div className="ps-2 mt-2">
                  <Typography className="text-white" sx={{ fontSize: "12px" }}>
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
                  <Typography className="text-white" sx={{ fontSize: "12px" }}>
                    เวลาเริ่ม <span>{dataBlack?.time_start}</span>
                  </Typography>
                </div>
                <div className="ps-2">
                  <Typography className="text-white" sx={{ fontSize: "12px" }}>
                    เวลาสิ้นสุด <span>{dataBlack?.time_end}</span>
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
            วันที่จอง : {state.dateSearch}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            เวลาจอง : {state.selectedTime}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            บัญชีเทรด : {state.selectedTrad}
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

export default User;
