import React, { ReactNode } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

export interface ICustomFormFieldProps {
  control: Control<any>;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: ReactNode;
  disabled?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

export enum CustomFormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE = "phone",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const doctorFormSchema = z.object({});
