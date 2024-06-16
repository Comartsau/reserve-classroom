import React, { useState, useReducer, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale
import {
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import axios from "axios";
import { HeaderAPI } from "@/headerApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateReserveModal from "../../createReserveModal";
import EditReserveModal from "../../editReserveModal";

const initialState = {
  date: null,
  time_start: null,
  time_end: null,
  count: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_TIME_START":
      return { ...state, time_start: action.payload };
    case "SET_TIME_END":
      return { ...state, time_end: action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

function HomeAdmin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModalCreateReserve, setOpenModalCreateReserve] = useState(false);
  const [openModalEditReserve, setOpenModalEditReserve] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);

  const modalStyleCreate = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  const handleDateSearch = (date) => {
    const formattedDate = date
      ? dayjs(date).add(543, "year").format("YYYY-MM-DD")
      : null;
    dispatch({ type: "SET_DATE_SEARCH", payload: formattedDate });
  };

  const handleClearDateSearch = () => {
    dispatch({ type: "SET_DATE_SEARCH", payload: null });
  };

  const ModalCreateReserve = () => {
    dispatch({ type: "CLEAR" });
    setOpenModalCreateReserve(!openModalCreateReserve);
  };

  const ModalEditReserve = (data) => {
    setEditData(data);
    setOpenModalEditReserve((prev) => !prev);
  };



  const handleFetchReserve = async () => {
    const data = {
      date: state?.dateSearch,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/booking`,
        data,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    handleFetchReserve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleCreateReserve = async () => {
    if (!state.date || !state.time_start || !state.time_end || !state.count) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const data = {
      date: dayjs(state?.date).add(543, "year").format("YYYY-MM-DD"),
      time_start: dayjs(state?.time_start).format("HH:mm"),
      time_end: dayjs(state?.time_end).format("HH:mm"),
      count: Number(state?.count),
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/booking/insert`,
        data,
        {
          ...HeaderAPI(localStorage?.getItem("Token")),
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setOpenModalCreateReserve(false);
        handleFetchReserve();
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleEditReserve = async (id) => {
    console.log(state.data)
    const data = {
      date: dayjs(state?.date).add(543, "year").format("YYYY-MM-DD"),
      time_start: dayjs(state?.time_start).format("HH:mm"),
      time_end: dayjs(state?.time_end).format("HH:mm"),
      count: Number(state?.count),
    };

    console.log(data)
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/api/booking/${id}`,
        data,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setOpenModalEditReserve(false);
        handleFetchReserve();
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const handleDeleteReserve = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/booking/${id}`,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );

      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleFetchReserve();
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer autoClose={2000} theme="colored" />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
        <Card sx={{ display: "flex", width: "800px", height: "85vh" }}>
          <div className=" w-full p-5 justify-center items-center align-middle">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 px-5   items-center">
              <div className="flex gap-3">
                <DatePicker
                  label="ค้นหาจากวันที่"
                  value={
                    state.dateSearch
                      ? dayjs(state.dateSearch).add(-543, "year")
                      : null
                  }
                  onChange={handleDateSearch}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClearDateSearch}
                  size="small"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  ล้างค้นหา
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ModalCreateReserve}
                >
                  สร้างรอบใหม่
                </Button>
              </div>
            </div>
            <div className="mt-3 ">
              <TableContainer
                component={Paper}
                sx={{ width: "100%", marginTop: "20px", height: "500px" }}
                size="small"
              >
                <Table size="small">
                  <TableHead>
                    <TableRow className="bg-purple-200">
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        วันที่
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        เวลาเริ่มต้น
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        เวลาสิ้นสุด
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        จำนวนที่นั่ง
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap", paddingX: "0" }}>
                        แก้ไข
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          paddingLeft: "1",
                          paddingRight: "10px",
                        }}
                      >
                        ลบ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                          ไม่พบข้อมูล
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.map((data, index) => (
                        <TableRow key={index} style={{ top: 57 }}>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {data?.date}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {data?.time_start}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {data?.time_end}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {data?.count}
                          </TableCell>
                          <TableCell
                            sx={{ whiteSpace: "nowrap", paddingX: "0" }}
                          >
                            <IconButton
                              onClick={() => ModalEditReserve(data)}
                              sx={{
                                whiteSpace: "nowrap",
                                paddingX: "0",
                                color: "#ffc107",
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            sx={{ whiteSpace: "nowrap", paddingX: "0" }}
                          >
                            <IconButton
                              onClick={() => handleDeleteReserve(data?.id)}
                              sx={{
                                whiteSpace: "nowrap",
                                paddingX: "0",
                                color: "#9f0500",
                                paddingLeft: "12px",
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Card>
        <CreateReserveModal
          open={openModalCreateReserve}
          onClose={ModalCreateReserve}
          onCreate={handleCreateReserve}
          dispatch={dispatch}
          modalStyleCreate={modalStyleCreate}
        />
        <EditReserveModal
          open={openModalEditReserve}
          onClose={ModalEditReserve}
          onEdit={handleEditReserve}
          dispatch={dispatch}
          modalStyleCreate={modalStyleCreate}
          data={editData}
        />
      </LocalizationProvider>
    </div>
  );
}

export default HomeAdmin;
