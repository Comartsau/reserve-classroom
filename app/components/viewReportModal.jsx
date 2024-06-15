import React from 'react';
import { Box, Button, Typography, TextField, Modal } from '@mui/material';
import { DatePicker, DesktopTimePicker, TimePicker } from '@mui/x-date-pickers';

const ViewReportModal = ({ open, onClose, onView, dispatch, modalStyleCreate ,data }) => {
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
            ข้อมูลผู้เรียน
          </Typography>
        </div>
        <div className="flex flex-col p-4 gap-3">
          <div className="flex items-center">
            <DatePicker
              label="วันที่"
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
              <DesktopTimePicker 
                label="เวลาเริ่มต้น"
                onChange={(time) => dispatch({ type: "SET_TIME_START", payload: time })}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </div>
            <div className="flex w-1/2 items-center">
              <DesktopTimePicker 
                label="เวลาสิ้นสุด"
                onChange={(time) => dispatch({ type: "SET_TIME_END", payload: time })}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </div>
          </div>
          <div>
            <TextField
              label="จำนวนที่นั่ง"
              type="number"
              size="small"
              className="w-full"
              onChange={(e) => dispatch({ type: "SET_COUNT", payload: e.target.value })}
            />
          </div>
        </div>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1, color: "red" }}>
            ยกเลิก
          </Button>
          <Button variant="contained" onClick={onView}>
            ยืนยัน
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewReportModal;
