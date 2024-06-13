"use client";
import { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditReserveModal = ({
  open,
  onClose,
  onEdit,
  dispatch,
  modalStyleCreate,
  data,
}) => {
  const [localCount, setLocalCount] = useState("");

  useEffect(() => {
    if (data) {
      setLocalCount(data?.count || "");
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyleCreate}>
        <div className="bg-black rounded-sm">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", textAlign: "center" }}
          >
            แก้ไขห้องเรียน
          </Typography>
        </div>
        <div className="flex flex-col p-4 gap-3">
          <div className="flex items-center">
            <DatePicker
              label="วันที่"
              value={
                data?.date
                  ? dayjs(data?.date, "DD-MM-YYYY").subtract(543, "year")
                  : null
              }
              onChange={(date) => dispatch({ type: "SET_DATE", payload: date })}
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex w-1/2 items-center">
              <TimePicker
                label="เวลาเริ่มต้น"
                value={
                  data?.time_start ? dayjs(data.time_start, "HH:mm") : null
                }
                onChange={(time) =>
                  dispatch({ type: "SET_TIME_START", payload: time })
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </div>
            <div className="flex w-1/2 items-center">
              <TimePicker
                label="เวลาสิ้นสุด"
                value={data?.time_end ? dayjs(data.time_end, "HH:mm") : null}
                onChange={(time) =>
                  dispatch({ type: "SET_TIME_END", payload: time })
                }
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </div>
          </div>
          <div>
            {/* <TextField
              label="จำนวนที่นั่ง"
              type="number"
              size="small"
              className="w-full"
              value={data?.count || ""}
              onChange={(e) =>
                dispatch({ type: "SET_COUNT", payload: e.target.value })
              }
            /> */}
            <TextField
              label="จำนวนที่นั่ง"
              type="number"
              size="small"
              className="w-full"
              value={localCount}
              onChange={(e) => setLocalCount(e.target.value)}
              onBlur={() =>
                dispatch({ type: "SET_COUNT", payload: localCount })
              }
            />
          </div>
        </div>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1, color: "red" }}>
            ยกเลิก
          </Button>
          <Button variant="contained" onClick={() => onEdit(data.id)}>
            ยืนยัน
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditReserveModal;
