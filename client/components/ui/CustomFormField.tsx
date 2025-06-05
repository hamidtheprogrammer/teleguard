import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CustomFormFieldType,
  ICustomFormFieldProps,
} from "@/app/types/formTypes";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: ICustomFormFieldProps;
}) => {
  const { type, placeholder, children } = props;

  switch (type) {
    case CustomFormFieldType.INPUT:
      return (
        <div className="relative">
          {children}
          <FormControl>
            <Input placeholder={placeholder} {...field} className="pl-10" />
          </FormControl>
        </div>
      );

    case CustomFormFieldType.PHONE:
      return (
        <div>
          <FormControl>
            <PhoneInput
              onChange={field.onChange}
              defaultCountry="US"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value}
              className="input-phone border-[2px] rounded-md"
            />
          </FormControl>
        </div>
      );

    case CustomFormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="">
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
  }
};

const CustomFormField = (props: ICustomFormFieldProps) => {
  const { control, type, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {type !== CustomFormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
