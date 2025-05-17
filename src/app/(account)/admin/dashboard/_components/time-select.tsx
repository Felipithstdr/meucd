"use client";

import { Select, SelectItem } from "@heroui/react";
import { isMatch } from "date-fns/isMatch";
import { useRouter, useSearchParams } from "next/navigation";

import { MONTH_OPTIONS } from "../_constants/payments";

const TimeSelect = () => {
  const { push } = useRouter();

  const searchParams = useSearchParams();
  let month = searchParams.get("month");

  const handleMonthChange = (month: string) => {
    push(`/admin/dashboard?month=${month}`);
  };

  if (!month || !isMatch(month, "MM")) {
    const currentMonthIndex = new Date().getMonth();
    month = MONTH_OPTIONS[currentMonthIndex].value;
  }

  return (
    <Select
      label="Selecione um mês"
      className="sm:max-w-xs max-w-1/2" 
      color="primary"
      size="sm"
      selectedKeys={[month]}
      onChange={(event) => handleMonthChange(event.target.value)}
    >
      {MONTH_OPTIONS.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default TimeSelect;
