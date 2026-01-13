import { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { Modaltrigger } from "../contex/context-context";
import Select from "react-select";
import { useCorporateGoals, useDelete } from "../api/databook/route-data";
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
const FinancialCard = ({ data, onClick }) => {
  const { title, subtitle, value, unit, target, trend, trendValue, chartData } = data;

  const maxValue = Math.max(...chartData);
  const isPositive = trend === 'up';

  const labels = [
    "TARGET in BILLIONS CFA",
    "RESULTS in BILLION CFA",
  ];
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0">
          {/* Title — 1 line */}
          <h3
            className="text-gray-600 text-sm font-medium mb-1 line-clamp-1"
            title={title}
          >
            {title}
          </h3>

          {/* Subtitle — 2 lines */}
          <p
            className="text-gray-800 text-xs font-semibold uppercase line-clamp-2"
            title={subtitle}
          >
            {subtitle}
          </p>
        </div>

        {/* Trend badge */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            isPositive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-gray-900">{value}</span>
          {unit && (
            <span className="text-sm font-semibold text-gray-600">{unit}</span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1 truncate">
          Target {target}
        </p>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-3 h-24 mt-6">
        {chartData.map((val, idx) => {
          const height = (val / maxValue) * 100;
          const labels = ['Target', 'Achieved'];

          let barColor = 'bg-gray-400';
          if (idx === chartData.length - 1) {
            barColor = val < chartData[idx - 1] ? 'bg-red-500' : 'bg-green-500';
          }

          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center h-20">
                <div
                  className={`w-24 transition-all ${barColor}`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">
                {labels[idx] || ''}
              </span>
            </div>
          );
        })}
      </div> 
    </div>
  );
};

const FinancialReportModal = ({ data, onClose }) => {
  if (!data) return null;

  const { title, subtitle, value, unit, target, trend, trendValue, chartData } = data;
  const maxValue = Math.max(...chartData);
  const isPositive = trend === 'up';
  const labels = ['Target', 'Achieved'];

  // Calculate Y-axis scale
  const roundToNice = (num) => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
    return Math.ceil(num / magnitude) * magnitude;
  };
  const yMax = roundToNice(maxValue * 1.1);
  const yStep = yMax / 5;
  const yAxisLabels = Array.from({ length: 6 }, (_, i) => yMax - (i * yStep));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 rounded-t-3xl shadow-lg">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 leading-tight">{title}</h2>
              <p className="text-purple-100 text-base font-medium leading-relaxed">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all hover:rotate-90 duration-300"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Metrics Section - Horizontal */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl px-6 py-4 flex-1 border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Achieved</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{value}</span>
                  {unit && <span className="text-sm font-semibold text-gray-600">{unit}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl px-6 py-4 flex-1 border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Target</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{target}</span>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-base font-bold shadow-lg ${
              isPositive ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            }`}>
              {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              {trendValue}
            </div>
          </div>

          {/* Enhanced Chart with Axis */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Performance Analysis Chart
            </h3>
            
            <div className="flex gap-8">
              {/* Y-Axis */}
              <div className="flex flex-col justify-between h-80 py-2 text-right pr-4">
                {yAxisLabels.map((label, idx) => (
                  <div key={idx} className="text-sm font-semibold text-gray-600">
                    {Math.round(label).toLocaleString()}
                  </div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {yAxisLabels.map((_, idx) => (
                    <div key={idx} className="border-t border-gray-300 border-dashed"></div>
                  ))}
                </div>

                {/* Bars */}
                <div className="relative flex items-end justify-around gap-12 h-80 px-8 pt-2">
                  {chartData.map((val, idx) => {
                    const height = Math.max((val / yMax) * 100, 2);

                    let barGradient = 'from-gray-400 to-gray-500';
                    if (idx === chartData.length - 1) {
                      barGradient = val < chartData[idx - 1] 
                        ? 'from-red-400 to-red-600' 
                        : 'from-green-400 to-green-600';
                    }

                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 max-w-xs">
                        <div className="w-full flex items-end justify-center h-full relative group">
                          {/* 3D Bar Effect */}
                          <div className="relative w-full max-w-[180px] h-full flex items-end">
                            {/* Bar shadow */}
                            <div 
                              className="absolute bottom-0 left-2 w-full bg-black opacity-20 blur-sm transition-all duration-500 rounded-t-xl"
                              style={{ height: `${height}%` }}
                            />
                            {/* Main bar */}
                            <div
                              className={`relative w-full bg-gradient-to-br ${barGradient} transition-all duration-500 rounded-t-xl shadow-xl hover:shadow-2xl group-hover:scale-105 border-2 border-white`}
                              style={{ height: `${height}%`, minHeight: '8px' }}
                            >
                              {/* 3D top edge */}
                              <div className="absolute top-0 left-0 right-0 h-3 bg-white opacity-30 rounded-t-xl"></div>
                              {/* Side highlight */}
                              <div className="absolute top-0 left-0 bottom-0 w-2 bg-white opacity-20"></div>
                              {/* Value label */}
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-lg font-bold">{idx === 0 ? target : value}</span>
                                {unit && <span className="text-xs ml-1">{unit}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* X-Axis Label */}
                        <div className="mt-6 text-center">
                          <span className="text-base font-bold text-gray-800 block">{labels[idx]}</span>
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            in CFA
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* X-Axis Line */}
            <div className="ml-20 mr-8 mt-2 border-t-2 border-gray-400"></div>
            <p className="text-center text-sm font-semibold text-gray-600 mt-3">Performance Metrics</p>
          </div>

          {/* Analysis Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Performance Analysis</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {chartData[1] >= chartData[0] 
                    ? `Outstanding performance! Results exceeded target by ${((chartData[1] - chartData[0]) / chartData[0] * 100).toFixed(1)}%. This represents strong execution and market positioning.`
                    : `Current performance is ${((chartData[0] - chartData[1]) / chartData[0] * 100).toFixed(1)}% below target. Strategic focus and optimization needed to close the gap.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dummyGoals = [
  {
    goalTitle: "Placement d'obligations (OAT, BAT hors DAT)",
    description: "Placement dobligations, OAT, BAT hors DAT",
    targetAchieved: 118000000000,
    maintarget: 65000000000,
  },
  {
    goalTitle: "Placement d'actions",
    description: "Placement d'actions sur le marché primaire et hors marché",
    targetAchieved: 175833000,
    maintarget: 3000000000,
  },
  {
    goalTitle: "Structuration et levée de fonds",
    description: "Structuration et levée de fonds",
    targetAchieved: 115000000000,
    maintarget: 100000000000,
  },
  {
    goalTitle: "Courtage",
    description: "Courtage (valeur transigée)",
    targetAchieved: 7500000000,
    maintarget: 6500000000,
  },
  {
    goalTitle: "Ouverture de comptes",
    description: "Ouverture de comptes",
    targetAchieved: 774,
    maintarget: 400,
  },
  {
    goalTitle: "Portefeuille conservé",
    description: "Portefeuille conservé",
    targetAchieved: 383000000000,
    maintarget: 385000000000,
  },
  {
    goalTitle: "Chiffre d'Affaires",
    description: "Chiffre d'Affaires",
    targetAchieved: 2573669073,
    maintarget: 2701304352,
  },
  {
    goalTitle: "Résultat Net",
    description: "Résultat Net",
    targetAchieved: 484483467,
    maintarget: 641000000,
  },
];

const FinancialProjections = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = dummyGoals.map(goal => {
    const achieved = Number(goal.targetAchieved);
    const target = Number(goal.maintarget);

    const formattedAchieved = formatBigNumber(achieved);
    const formattedTarget = formatBigNumber(target);

    const progressPercent = ((achieved / target) * 100).toFixed(1);
    const trend = achieved >= target ? "up" : "down";

    return {
      title: goal.goalTitle.toUpperCase(),
      subtitle: goal.description,
      value: formattedAchieved,
      unit: '',
      target: formattedTarget,
      trend,
      trendValue: `${progressPercent}%`,
      chartData: [target, achieved],
    };
  });

  return (
    <div className="min-h-screen mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        {cardsData.map((card, index) => (
          <FinancialCard key={index} data={card} onClick={() => setSelectedCard(card)} />
        ))}
      </div>

      {selectedCard && (
        <FinancialReportModal 
          data={selectedCard} 
          onClose={() => setSelectedCard(null)} 
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default FinancialProjections;



// const FinancialProjections = () => {
//   const { goals } = useCorporateGoals();

//   const cardsData = goals.map(goal => {
//     const achieved = Number(goal.targetAchieved);
//     const target = Number(goal.maintarget);

//     const maxValue = Math.max(achieved, target);
//     const { unit, divisor } = getUnitAndDivisor(maxValue);

//     const formattedAchieved = formatByMagnitude(achieved, divisor);
//     const formattedTarget = formatByMagnitude(target, divisor);

//     const progressPercent = ((achieved / target) * 100).toFixed(1);
//     const trend = achieved >= target ? "up" : "down";

//     return {
//       title: goal.goalTitle.toUpperCase(),
//       subtitle: goal.description,
//       value: formattedAchieved,
//       unit,
//       target: formattedTarget,
//       trend,
//       trendValue: `${progressPercent}%`,
//       chartData: [target, achieved], // raw values for chart
//     };
//   });

//   return (
//     <div className="min-h-screen mt-3">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//         {cardsData.map((card, index) => (
//           <FinancialCard key={index} data={card} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FinancialProjections;

 // Number formatting helper (K, M, B with 1 decimal when needed)
  export const formatBigNumber = (num) => {
    if (num == null || isNaN(num)) return "—";

    const absNum = Math.abs(num);

    if (absNum < 10000) {
      return num.toLocaleString();
    }

    let formatted;
    if (absNum >= 1_000_000_000) {
      formatted = (absNum / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (absNum >= 1_000_000) {
      formatted = (absNum / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (absNum >= 10_000) {
      formatted = (absNum / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      formatted = absNum.toLocaleString();
    }

    return num < 0 ? "-" + formatted : formatted;
  };
