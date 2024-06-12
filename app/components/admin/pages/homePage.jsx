import React, { useState } from "react";
import TextField from "@mui/material/TextField";
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
} from "@mui/material";

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([
    {
      date: "12-06-2024",
      room: "101",
      reservedBy: "Alice",
      time: "10:00 - 12:00",
    },
    {
      date: "13-06-2024",
      room: "202",
      reservedBy: "Bob",
      time: "13:00 - 15:00",
    },
  ]);

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    setSelectedDate(formattedDate);
  };

  console.log(selectedDate);

  return (
    <div className="flex justify-center">
      <Card sx={{ display: "flex", width: "800px", height: "85vh" }}>
        <div className=" w-full p-5 justify-center items-center align-middle">
          <div className="flex px-5  justify-between">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
              <DatePicker
                label="ค้นหาจากวันที่"
                // value={selectedDate ? dayjs(selectedDate, 'DD-MM-YYYY') : null}
                onChange={handleDateChange}
                // inputFormat="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
            <Button variant="contained" color="primary">
              สร้างรอบใหม่
            </Button>
          </div>
          <div className="mt-3 ">
            <TableContainer
              component={Paper}
              sx={{ width: "100%", marginTop: "20px"}}
              size="small"
            >
              <Table size="small" className=" overflow-auto">
                <TableHead>
                  <TableRow className="bg-purple-200  ">
                    <TableCell sx={{ whiteSpace: "nowrap" }}>วันที่</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      ชื่อห้องเรียน
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>ผู้จอง</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>เวลา</TableCell>
                    <div>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>แก้ไข</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>ลบ</TableCell>
                    </div>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.reservedBy}</TableCell>
                      <TableCell>{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MyDatePicker;
