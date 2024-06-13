import React, { useReducer, useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomFormControl = styled(FormControl)(({ theme, disabled }) => ({
  "& .MuiInputBase-root.Mui-disabled": {
    borderColor: disabled ? "red" : "inherit",
    borderWidth: disabled ? "1px" : "inherit",
    borderStyle: disabled ? "solid" : "inherit",
  },
}));

const initialState = {
  date: null,
  dateSearch: null,
  selectDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, selectDate: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

function ReportAdmin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);

  const handleDateSearch = (date) => {
    const formattedDate = date
      ? dayjs(date).add(543, "year").format("YYYY-MM-DD")
      : null;
    dispatch({ type: "SET_DATE_SEARCH", payload: formattedDate });
  };

  const handleClearDateSearch = () => {
    dispatch({ type: "SET_DATE_SEARCH", payload: null });
  };

  const handleFetchReport = async () => {
    const data = { date: state?.dateSearch };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/booking`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch {
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    handleFetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dateSearch]);

  const handleSelect = (type) => (event) => {
    console.log(event.target.value)
    dispatch({ type, payload: event.target.value });
  };


  return (
    <div className="flex justify-center">
      <ToastContainer autoClose={2000} theme="colored" />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
        <Card sx={{ display: "flex", width: "800px", height: "85vh" }}>
          <div className="w-full p-5  items-center align-middle">
            <div className="flex flex-col sm:flex-row  gap-3 px-5 ">
              <div className="flex gap-3">
                <DatePicker
                  label="ค้นหาจากวันที่"
                  value={
                    state.dateSearch
                      ? dayjs(state.dateSearch).add(-543, "year")
                      : null
                  }
                  onChange={handleDateSearch}
                  slotProps={{ textField: { size: "small" } }}
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
              <div className="flex w-[200px] justify-start">
                <CustomFormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    วันที่จอง
                  </InputLabel>
                  <Select
                    labelId="date-select-label"
                    id="date-select"
                    value={state.selectDate}
                    label="วันที่จอง"
                    onChange={handleSelect("SET_DATE")}
                    className=" border-green-300"
                  >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Ten">Ten</MenuItem>
                    <MenuItem value="Twenty">Twenty</MenuItem>
                    <MenuItem value="Thirty">Thirty</MenuItem>
                  </Select>
                </CustomFormControl>
              </div>
            </div>

            <div className="mt-3">
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  height: "500px",
                  overflow: "auto",
                }}
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
                      data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {item?.date}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {item?.time_start}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {item?.time_end}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {item?.count}
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
      </LocalizationProvider>
    </div>
  );
}

export default ReportAdmin;
