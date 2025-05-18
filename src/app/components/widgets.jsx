import { useContext, useState } from "react";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { MdDelete, MdOutlineLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";
import { useGoalDelete } from "../api/databook/route-data";
import { Modaltrigger } from "../contex/context-context";
import Select from "react-select";
import { IoLocationOutline, IoPerson } from "react-icons/io5";
import Image from "next/image";

export function Delete({ data, message, name }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { triggerComponent } = useContext(Modaltrigger); 
  
    const { deleteGoals } = useGoalDelete();
  
    const deleteFunctions = {
      assignGoal: deleteGoals,
    };
  
    const handleDelete = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        if (!name || !deleteFunctions[name]) {
          return;
        }
  
        const { id} = data;
        const deleteFunction = deleteFunctions[name];
  
        const response = await deleteFunction(id);
  
        if (response?.status === 201) {
          //showToast("Successfully deleted", "success");
          triggerComponent();
          handleClose();
        } else {
         // showToast("Failed to delete. Please try again", "error");
          console.error("Delete failed:", response);
        }
      } catch (error) {
        //showToast("An error occurred. Please try again later.", "error");
        console.error("Delete error:", error);
      } finally {
        setIsSubmitting(false);
        setOpen(false); // Close the modal after the operation
      }
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <IconButton onClick={handleOpen}>
          <MdDelete color="red" />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: 450, bgcolor: "white", borderBottom: "4px solid #000", boxShadow: "40px rgba(0, 0, 0, 0.2)", borderRadius: "8px", p: 2 }}>
            <div className="flex flex row items-center justify-center mb-4">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path  stroke-linecap="round"  stroke-linejoin="round"  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
              </div>
              <div className="ml-2">
                <Typography component="h2">{message}</Typography>
              </div>
            </div>
            <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
              <button className="p-3 m-2 bg-transparent hover:bg-blue-900 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit" onClick={handleDelete} disabled={isSubmitting}>
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
              ${disabled ? "text-gray-300" : ""}`}
          >
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
          ${disabled ? "bg-gray-100" : ""}`}
      >
        <option value="" disabled>Select ...</option>
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
          className={`block text-[12.5px] text-[#08376B] ${error ? "text-red-500" : ""}`}
        >
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


export function PersonalAccountCard() {
  return (
    <main className="flex text-black card bg-white p-4 justify-center rounded-lg">
      <div className="flex-[1] border-r-2 border-r-[#cbd5e1] p-6 flex flex-col space-y-6">
        <div className="flex flex-col items-center">
          <Image
            // src={avatar}
            alt="Paris"
            className="rounded-full border-2 mb-4"
            width={156}
            height={156}
          />
          <h6 className="mb-12 text-sm">Upload Image</h6>
        </div>
        <div className="mb-4 flex flex-row items-center">
          <span className="mr-4">
            <IoPerson color="blue" />
          </span>
          <span>Robert Knaihv</span>
        </div>
        <div className="mb-2 flex flex-row items-center">
          <span className="mr-4">
            <MdOutlineMarkEmailRead color="blue" />
          </span>
          <span>knaihv@ymail.com</span>
        </div>
        <div className="mb-2 flex flex-row items-center">
          <span className="mr-4">
            <MdOutlineLocalPhone color="blue" />
          </span>
          <span>+233 544-5342</span>
        </div>
        <div className="mb-2 flex flex-row items-center">
          <span className="mr-4">
            <IoLocationOutline color="blue" />
          </span>
          <span>JohnBull Street</span>
        </div>
      </div>
      <div className="flex-[2]">
        <div className="grid grid-cols-2 gap-8 p-4">
          <FormInputField
            label="Last Name"
            type="text"
            id="lname"
            // value={formData.name}
            // onChange={handleInputChange}
            placeholder="last name"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Other Name"
            type="text"
            id="Oname"
            // value={formData.name}
            // onChange={handleInputChange}
            placeholder="other name"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Email"
            type="email"
            id="email"
            // value={formData.name}
            // onChange={handleInputChange}
            placeholder="Enter your email"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Phone"
            type="phone"
            id="phone"
            // value={formData.name}
            // onChange={handleInputChange}
            placeholder="phone number"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Address 1"
            type="text"
            id="address1"
            // value={formData.name}
            // onChange={handleInputChange}
            placeholder="address 1"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Nationality"
            type="text"
            id="nationality"
            // value="hi"
            // onChange={handleInputChange}
            placeholder="nationality"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="DOB"
            type="text"
            id="dob"
            // value="hi"
            // onChange={handleInputChange}
            placeholder="date of birth"
            required
            // error={error && !email ? "Email is required" : ""}
          />
          <FormInputField
            label="Name"
            type="text"
            id="name"
            placeholder="Enter your email"
            required
          />
          <FormInputField
            label="Name"
            type="text"
            id="name"
            placeholder="Enter your email"
            required
          />
          <FormInputField
            label="Name"
            type="text"
            id="name"
            // value="hi"
            // onChange={handleInputChange}
            placeholder="Enter your email"
            required
            // error={error && !email ? "Email is required" : ""}
          />
        </div>
        {/* <div className="px-16 mt-8">
          <CustomButton
            label="Submit"
            // onClick={handleSubmit}
            type="submit"
            className="custom-class"
            // loading={isSubmitting}
          />
        </div> */}
      </div>
    </main>
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