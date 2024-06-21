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
  Typography,
  IconButton,
} from "@mui/material";

import PreviewIcon from "@mui/icons-material/Preview";
import { styled } from "@mui/system";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewReportModal from "../../viewReportModal";

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
  selectTime: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TIMESELECT":
      return { ...state, selectTime: action.payload };
    case "SET_DATE_SEARCH":
      return { ...state, dateSearch: action.payload };
    case "SET_SELECTED_TIME":
      return { ...state, selectedTimeId: action.payload }; // เพิ่ม case สำหรับเก็บค่า select
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

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

function ReportAdmin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [openModalViewReport, setOpenModalViewReport] = useState(false);
  const [dataViewReport, setDataViewReport] = useState([]);

  const handleDateSearch = (date) => {
    const formattedDate = date
      ? dayjs(date).add(543, "year").format("YYYY-MM-DD")
      : null;
    dispatch({ type: "SET_DATE_SEARCH", payload: formattedDate });
  };

  const handleClearDateSearch = () => {
    dispatch({ type: "SET_DATE_SEARCH", payload: null });
    dispatch({ type: "SET_SELECTED_TIME", payload: null });
  };

  const handleFetchTimeReport = async () => {
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
    handleFetchTimeReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.dateSearch]);

  const handleSelectChange = (event) => {
    dispatch({ type: "SET_SELECTED_TIME", payload: event.target.value });
  };

  const handleFetchReport = async () => {
    const data = {
      date: state?.dateSearch || "",
      id: state?.selectedTimeId || "",
      page: page,
    };
    // console.log(data);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report/users`,
        data,
        { ...HeaderAPI(localStorage.getItem("Token")) }
      );
      console.log(res)
      if (res.status === 200) {
        setData(res?.data); //
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
  }, [state.dateSearch, state.selectedTimeId ,page]);

  // รวมค่า sum_count ใน array ทั้งหมด
  const totalSumCount = data?.items?.reduce((acc, item) => {
    return acc + (parseInt(item?.sum_count, 10) || 0);
  }, 0);

  const ModalViewReport = () => {
    setOpenModalViewReport((prev) => !prev);
  };

  const handleViewReport = async (item) => {
    let id = Number(item?.id);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/report/users/${id}`,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setDataViewReport(res.data);
        ModalViewReport();
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer autoClose={2000} theme="colored" />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
        <Card sx={{ display: "flex", width: "800px", height: "85vh" }}>
          <div className="w-full p-5 align-middle  ">
            <div className="flex ">
              <div className="flex flex-col  sm:items-center  sm:flex-row gap-3 ">
                <div>
                  <DatePicker
                    label="ค้นหาจากวันที่"
                    value={
                      state.dateSearch
                        ? dayjs(state.dateSearch).add(-543, "year")
                        : null
                    }
                    onChange={handleDateSearch}
                    slotProps={{ textField: { size: "small" } }}
                    className="w-auto sm:w-[250px]"
                  />
                </div>
                <div>
                  <CustomFormControl
                    fullWidth
                    size="small"
                    disabled={!state?.dateSearch}
                  >
                    <InputLabel>วันที่จอง</InputLabel>
                    <Select
                      id="date-select"
                      label="วันที่จอง"
                      className=" w-auto  sm:w-[250px]"
                      value={state?.selectedTimeId || ""}
                      onChange={handleSelectChange}
                    >
                      {state.selectTime?.map((item, index) => (
                        <MenuItem key={index} value={item?.id || ""}>
                          รอบเวลา: {item?.time_start || ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </CustomFormControl>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClearDateSearch}
                    // size="small"
                    sx={{
                      backgroundColor: "#093165",
                      color: "#fff",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#062a51", // สีเมื่อ hover
                      },
                    }}
                  >
                    ล้างค้นหา
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-5  ">
              <Typography>
                จำนวนนักเรียนที่จองทั้งหมด:{" "}
                <span>{totalSumCount || 0} ท่าน</span>
              </Typography>
            </div>

            <div>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  height: "460px",
                  overflow: "auto",
                  padding: "0px",
                  marginTop: "10px",
                }}
                size="small"
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{backgroundColor:"#ced6e0"}}>
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
                        จำนวนจอง
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        จำนวนที่นั่ง
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        ดูผู้เรียน
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                          ไม่พบข้อมูล
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.items?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            {item?.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            {item?.time_start}
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            {item?.time_end}
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            {item?.sum_count}
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            {item?.count}
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              padding: "0px",
                              margin: "0px",
                              paddingLeft: "15px",
                            }}
                          >
                            <IconButton
                              onClick={() => handleViewReport(item)}
                              sx={{
                                whiteSpace: "nowrap",
                                paddingX: "0",
                                color: "#df9e10",
                              }}
                            >
                              <PreviewIcon
                                sx={{
                                  width: "30px",
                                  height: "30px",
                                  padding: "0px",
                                  margin: "0px",
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <div className="flex justify-end gap-5 mt-1 px-2 items-center ">
                  <Button
                    size="small"
                    disabled={page == 1}
                    onClick={() => setPage((page) => Math.max(page - 1, 1))}
                    sx={{
                      backgroundColor: "#CCCCCC",
                      color: "#fff",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#909090", // สีเมื่อ hover
                      },
                      width: "0px",
                    }}
                  >
                    ก่อนหน้า
                    {/* <IoIosArrowBack /> */}
                  </Button>
                  <span>
                    หน้าที่ {page} / {data?.totalPages || 1}{" "}
                  </span>
                  <Button
                    size="small"
                    disabled={
                      Number(data?.totalPages) - Number(page) < 1 ? true : false
                    }
                    onClick={() => setPage((page) => page + 1)}
                    sx={{
                      backgroundColor: "#CCCCCC",
                      color: "#fff",

                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#909090", // สีเมื่อ hover
                      },
                      width: "0px",
                    }}
                  >
                    ถัดไป
                  </Button>
                </div>
              </TableContainer>
            </div>
          </div>

          <ViewReportModal
            open={openModalViewReport}
            onClose={ModalViewReport}
            onView={handleViewReport}
            dispatch={dispatch}
            modalStyleCreate={modalStyleCreate}
            data={dataViewReport}
          />
        </Card>
      </LocalizationProvider>
    </div>
  );
}

export default ReportAdmin;
