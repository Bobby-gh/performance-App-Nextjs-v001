import { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Modaltrigger } from "../contex/context-context";
import Select from "react-select";
import { useDelete } from "../api/databook/route-data";
import { showToast } from "./notification";

export function Delete({ data, message, name, open, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerComponent } = useContext(Modaltrigger);
  const { deleteFunction } = useDelete();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !name ||
        !["goal", "accessGoal", "department", "user"].includes(name)
      ) {
        return;
      }

      const response = await deleteFunction(data, name);

      if (response?.status === 200) {
        showToast(`${name} deleted successfuly`, "success");
        onClose();
        triggerComponent();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("System Error please try again Later", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "white",
            borderBottom: "4px solid #000",
            boxShadow: "40px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            p: 2,
          }}>
          <div className="flex flex row items-center justify-center mb-4">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="ml-2">
              <Typography component="h2">{message}</Typography>
            </div>
          </div>
          <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
            <button
              className="p-3 m-2 bg-transparent hover:bg-blue-900 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
              onClick={handleDelete}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">loading...</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export function FormInputField({
  fieldLabel = false,
  label,
  disabled = false,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  error = "",
  id,
}) {
  return (
    <div className="mb-1">
      <div className="flex flex-row">
        {label && (
          <label
            className={`block text-[12.5px] text-[#08376B] ${
              (error ? "text-red-500" : "", disabled ? "text-gray-300" : "")
            }`}>
            {label} {required && <span className="required">*</span>}
          </label>
        )}
      </div>
      {fieldLabel && <div className="my-2.5" />}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        required={required}
        autoComplete="false"
        className={`w-full p-2 bg-gray-200  ${
          (error ? "border border-red-500" : "", disabled ? "bg-gray-100" : "")
        }`}
      />
    </div>
  );
}

export function ModalFormSelect({
  value,
  onChange,
  disabled = false,
  options = [],
  label,
  required = false,
  error = "",
  id,
}) {
  return (
    <div className="mb-1">
      <div className="flex">
        {label && (
          <label
            className={`block text-[12.5px] min-w-[120px] whitespace-nowrap text-[#08376B] 
              ${error ? "text-red-500" : ""} 
              ${disabled ? "text-gray-300" : ""}`}>
            {label} {required && <span className="required">*</span>}
          </label>
        )}
      </div>
      <select
        id={id}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={`w-full p-2 bg-gray-200 appearance-none
          ${error ? "border border-red-500" : ""} 
          ${disabled ? "bg-gray-100" : ""}`}>
        <option value="" disabled>
          Select ...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export const CustomSelect = ({
  isMulti = false,
  value,
  onChange,
  error,
  required = false,
  id,
  label,
  options = [],
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block text-[12.5px] text-[#08376B] ${
            error ? "text-red-500" : ""
          }`}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <Select
        id={id}
        required={required}
        isSearchable={true}
        options={options}
        defaultValue={value}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            height: "40px",
            padding: "2px",
            backgroundColor: "#E5E7EB",
            border: "none",
            borderRadius: "0",
          }),
        }}
      />
    </div>
  );
};

export function CustomButton({
  label = "Click me",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full p-2 bg-[#1E4D7E] rounded-xl text-white rounded-lg ${className} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}>
      {loading ? (
        <span className="flex items-center justify-center">
          {/* Spinner */}
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 5.292A7.964 7.964 0 014 12H2a10 10 0 0016.292 7.292l-1.414-1.414A8.003 8.003 0 016 17.292z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

export const ModalModification = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFFFFF !important",
  width: "87vw",
  height: "90vh",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export const TeamModalModification = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFFFFF !important",
  width: "60vw",
  height: "50vh",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export const CategoryType = [
  { value: "human relationship", label: "humanRelationship"},
  { value: "financial", label: "financial" },
  { value: "customer centred", label: "customerCentred" },
  {
    value: "innovation",
    label: "internalProcessingAndInnovation",
  },
];
