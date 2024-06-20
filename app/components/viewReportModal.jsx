import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
} from "@mui/material";

const ViewReportModal = ({
  open,
  onClose,
  onView,
  modalStyleCreate,
  data,
}) => {
  // console.log(data);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="mt-24"
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
        <div className="flex flex-col p-4 ">
          <Typography>ผู้เรียน (ชื่อตามไอดีไลน์)</Typography>
          <div className="flex flex-col   overflow-auto h-[50vh] ">
            <List >
              {data?.map((item, index) => (
                <ListItem
                  key={index}
                  className="text-xs border-4 border-white bg-gray-200 "
                >
                  {`${index +1}. ${item?.name}`}
                </ListItem>
              ))}
            </List>
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
