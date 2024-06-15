import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal,
  List,
  ListItem,
} from "@mui/material";
import { DatePicker, DesktopTimePicker, TimePicker } from "@mui/x-date-pickers";

const ViewReportModal = ({
  open,
  onClose,
  onView,
  dispatch,
  modalStyleCreate,
  data,
}) => {
  console.log(data);
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
          <Typography>ชื่อผู้เรียน</Typography>
          <List>
            {data?.map((item, index) => (
              <ListItem key={index}>{item?.name}</ListItem>
            ))}
          </List>
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
