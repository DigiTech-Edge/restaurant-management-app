"use client";

import React, { useState } from "react";
import { formatDate } from "@/helpers/dateConverter";
import { Button, Divider } from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import moment from "moment";
import Drawer from "@mui/material/Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#5F0101",
    },
  },
});

const PageHeader = ({
  title,
  showDate = true,
}: {
  title: string;
  showDate?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const handleDateChange = (newValue: moment.Moment | null) => {
    if (newValue) {
      setSelectedDate(newValue);
      closeDrawer();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{title}</p>
        {showDate && (
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold max-sm:hidden">
              {formatDate(selectedDate.toDate())}
            </p>
            <FaRegCalendarAlt
              size={24}
              className="cursor-pointer hover:opacity-70"
              onClick={openDrawer}
            />
          </div>
        )}
      </div>
      <Divider className="my-4 bg-[#5F0101]" />

      <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
        <div className="p-4 w-[350px]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#5F0101]">Select Date</h2>
            <Button
              variant="light"
              isIconOnly
              color="default"
              onClick={closeDrawer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-[#5F0101]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <ThemeProvider theme={customTheme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                className="text-[#5F0101] "
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
      </Drawer>
    </>
  );
};

export default PageHeader;
