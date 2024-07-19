import React from "react";
import { Box, Button, Typography, Modal, List, ListItem } from "@mui/material";

const ViewReportModal = ({ open, onClose, onView, modalStyleCreate, data }) => {
  console.log(data);
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
            <List>
              {data?.map((item, index) => (
                <ListItem
                  key={index}
                  className="text-xs border-4 border-white bg-gray-200 "
                >
                  <div className="flex flex-col w-full  justify-between">
                    <div className="flex gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      {" "}
                      <img
                        src={item?.image}
                        alt="User Profile"
                        style={styles.profileImage}
                      />
                      {`${index + 1}. ${item?.name} `}
                    </div>
                    <div className="flex items-center">{`${item?.trade}`}</div>
                    </div>
                  
                    <div className="flex gap-3 pl-14">
                    <div className="flex items-center">วรากร มูลทองสุข  </div>
                    <div className="flex items-center">0621234567</div>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1, color: "red" }}>
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={onView}
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
  );
};

const styles = {
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
};

export default ViewReportModal;
