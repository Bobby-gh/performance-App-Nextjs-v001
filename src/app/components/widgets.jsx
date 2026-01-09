import { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { TrendingUp, TrendingDown } from 'lucide-react';
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

export const ModalModifications = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFFFFF !important",
  width: "80vw",
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
  width: "80vw",
  height: "70vh",
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

//Coporate Goals
const FinancialCard = ({ data }) => {
  const { title, subtitle, value, unit, target, trend, trendValue, chartData } = data;
  
  const maxValue = Math.max(...chartData);
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80">
      {/* Header with trend badge */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <p className="text-gray-800 text-xs font-semibold uppercase">{subtitle}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          isPositive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      </div>
      
      {/* Value display */}
      <div className="mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
          <span className="text-xl font-semibold text-gray-900">{unit}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">Target {target}</p>
      </div>
      
      {/* Bar chart */}
      <div className="flex items-end justify-between gap-3 h-24 mt-6">
        {chartData.map((val, idx) => {
          const height = (val / maxValue) * 100;
          const labels = ['Prev 25', 'Att 25', 'Budg 26'];
          const isLast = idx === chartData.length - 1;
          
          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center h-20">
                <div 
                  className={`w-full rounded-t transition-all ${
                    isLast ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">{labels[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const FinancialProjections = () => {
  const cardsData = [
    {
      title: 'OBLIGATIONS',
      subtitle: 'PLACEMENT D\'OBLIGATIONS (OAT/BAT)',
      value: '65.0',
      unit: 'B',
      target: '26',
      trend: 'down',
      trendValue: '-44.7%',
      chartData: [45, 85, 30]
    },
    {
      title: 'ACTIONS',
      subtitle: 'PLACEMENT D\'ACTIONS',
      value: '3.0',
      unit: 'B',
      target: '26',
      trend: 'up',
      trendValue: '+1605.3%',
      chartData: [15, 5, 95]
    },
    {
      title: 'FONDS',
      subtitle: 'LEVÉE DE FONDS',
      value: '100.0',
      unit: 'B',
      target: '26',
      trend: 'down',
      trendValue: '-13.0%',
      chartData: [45, 90, 70]
    },
    {
      title: 'COURTAGE',
      subtitle: 'COURTAGE',
      value: '8.0',
      unit: 'B',
      target: '26',
      trend: 'up',
      trendValue: '+6.7%',
      chartData: [50, 75, 95]
    },
    {
      title: 'COMPTES',
      subtitle: 'OUVERTURE DE COMPTES',
      value: '500',
      unit: '',
      target: '26',
      trend: 'down',
      trendValue: '-35.4%',
      chartData: [40, 95, 60]
    },
    {
      title: 'PORTEFEUILLE',
      subtitle: 'PORTEFEUILLE CONSERVÉ',
      value: '400.0',
      unit: 'B',
      target: '26',
      trend: 'up',
      trendValue: '+14.4%',
      chartData: [55, 65, 85]
    },
    {
      title: 'CHIFFRE D\'AFFAIRES',
      subtitle: 'CHIFFRE D\'AFFAIRES',
      value: '2.7',
      unit: 'B',
      target: '26',
      trend: 'up',
      trendValue: '+3.0%',
      chartData: [60, 80, 90]
    },
    {
      title: 'RÉSULTAT NET',
      subtitle: 'RÉSULTAT NET',
      value: '619.0',
      unit: 'M',
      target: '26',
      trend: 'up',
      trendValue: '+27.8%',
      chartData: [55, 70, 85]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <FinancialCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};

export default FinancialProjections;