import React, { useContext, useState } from "react";
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
import { useTranslation } from "react-i18next";

export function Delete({ data, message, name, open, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerComponent } = useContext(Modaltrigger);
  const { deleteFunction } = useDelete();
  const { t } = useTranslation();

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
        showToast(t("deletedSuccessfully"), "success");
        onClose();
        triggerComponent();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast(t("systemError"), "error");
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
                  <p className="text-sm pr-2">{t("loading")}...</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                t("yes")
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
  placeholder,
}) {
  const { t } = useTranslation();
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
          {placeholder || t("selectOption")}
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
  loadingText = "Loading...",
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
          {loadingText}
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
  const { t } = useTranslation();
  const { title, subtitle, value, unit, target, trend, trendValue, chartData } = data;

  const maxValue = Math.max(...chartData, 1);
  const isPositive = trend === 'up';

  const labels = [t('target').toUpperCase(), t('achieved').toUpperCase()];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md cursor-pointer
        hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]
        transition-all duration-300
        w-full aspect-square flex flex-col
        overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
        <div className="min-w-0">
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1 line-clamp-1" title={title}>
            {title}
          </h3>
          <p className="text-gray-800 text-[10px] sm:text-xs font-semibold uppercase line-clamp-2" title={subtitle}>
            {subtitle}
          </p>
        </div>

        <div
          className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
            isPositive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {isPositive ? <TrendingUp size={10} className="sm:w-3 sm:h-3" /> : <TrendingDown size={10} className="sm:w-3 sm:h-3" />}
          {trendValue}
        </div>
      </div>

      {/* Value */}
      <div className="mb-2 sm:mb-3 px-3 sm:px-4 md:px-6 flex-shrink-0">
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-xs sm:text-sm font-semibold text-gray-600">{unit}</span>}
        </div>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{t('target')}: {target}</p>
      </div>

      {/* Bar Chart Area - Responsive & Square-Aware */}
      <div className="flex-1 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5 flex flex-col min-h-0">
        <div className="flex items-end justify-center gap-8 sm:gap-12 md:gap-16 h-full">
          {chartData.map((val, idx) => {
            const relative = val / maxValue;
            const heightPercent = Math.max(relative * 100, 10);

            const barColor =
              idx === 0
                ? 'bg-indigo-200'
                : val >= chartData[0]
                ? 'bg-green-600'
                : 'bg-red-600';

            return (
              <div key={idx} className="w-1/4 flex flex-col items-center min-w-0 h-full">
                {/* Bar container with explicit height */}
                <div className="w-full flex flex-col items-center justify-end flex-1">
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-700 mb-0.5 sm:mb-1">
                    {formatBigNumber(val)}
                  </span>
                  <div
                    className={`${barColor} w-full max-w-[110px] mx-auto rounded-t-lg transition-all duration-300 shadow-sm`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Label under bar */}
                <div className="mt-1 sm:mt-2 text-center flex-shrink-0">
                  <div className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-600">
                    {labels[idx]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FinancialReportModal = ({ data, onClose }) => {
  const { t } = useTranslation();
  if (!data) return null;

  const { title, subtitle, value, unit, target, trend, trendValue, chartData } = data;
  const maxValue = Math.max(...chartData);
  const isPositive = trend === 'up';
  const labels = [t('target'), t('achieved')];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-green-600 via-green-600 to-gray-500 text-white px-6 py-3 flex-shrink-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold mb-0.5 leading-tight break-words">{title}</h2>
              <p className="text-purple-100 text-xs font-medium leading-relaxed break-words">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-all hover:rotate-90 duration-300 flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto lg:overflow-y-visible">
          {/* Compact Metrics Row */}
          <div className="flex items-center gap-3 mb-4">
            {/* Achieved */}
            <div className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg px-3 py-2 flex-1 border border-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-[10px] font-semibold uppercase">{t('achieved')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-gray-900">{value}</span>
                  {unit && <span className="text-xs font-semibold text-gray-600">{unit}</span>}
                </div>
              </div>
            </div>

            {/* Target */}
            <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg px-3 py-2 flex-1 border border-purple-200">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-gray-600 text-[10px] font-semibold uppercase">{t('target')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-gray-900">{target}</span>
                </div>
              </div>
            </div>

            {/* Trend */}
            <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md ${
              isPositive ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            }`}>
              {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              <span className="text-lg">{trendValue}</span>
            </div>
          </div>

          {/* Large Chart - Square with Tall Bars */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-inner mb-4">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              {t('performanceChart')}
            </h3>
            
            {/* Chart Area - Tall Square */}
            <div className="flex items-end justify-center gap-24 px-16" style={{ height: '400px' }}>
              {chartData.map((val, idx) => {
                const height = (val / maxValue) * 100;

                let barColor = 'bg-gray-400';
                if (idx === 1) {
                  const targetVal = chartData[0];
                  barColor = val < targetVal ? 'bg-red-500' : 'bg-green-500';
                }

                return (
                  <div key={idx} className="flex flex-col items-center w-32 h-full">
                    {/* Bar container */}
                    <div className="w-full flex items-end justify-center flex-1 relative group mb-3">
                      <div className="relative w-full max-w-[150px] h-full flex items-end justify-center">
                        <div
                          className={`relative w-full ${barColor} transition-all duration-500 rounded-t-lg shadow-lg group-hover:opacity-90`}
                          style={{ height: `${height}%`, minHeight: '60px' }}
                        >
                          {/* Hover tooltip */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-10">
                            <div className="text-sm font-bold">{idx === 0 ? target : value}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-800 mb-0.5">{labels[idx]}</div>
                      <div className="text-xl font-bold text-gray-900">
                        {idx === 0 ? target : value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mx-16 mt-4 border-t-2 border-gray-400"></div>
            <p className="text-center text-xs font-semibold text-gray-600 mt-2">{t('performanceMetrics')}</p>
          </div>

          {/* Analysis Section Below */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-xl p-3 shadow-md">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1 text-xs">{t('performanceAnalysis')}</h4>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {chartData[1] >= chartData[0] 
                    ? `${t('performanceExceeded')} ${((chartData[1] - chartData[0]) / chartData[0] * 100).toFixed(1)}%. ${t('exceededTargetMessage')}`
                    : `${t('performanceBelow')} ${((chartData[0] - chartData[1]) / chartData[0] * 100).toFixed(1)}% ${t('belowTargetMessage')}`
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

// const FinancialProjections = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const cardsData = dummyGoals.map(goal => {
//     const achieved = Number(goal.targetAchieved);
//     const target = Number(goal.maintarget);

//     const formattedAchieved = formatBigNumber(achieved);
//     const formattedTarget = formatBigNumber(target);

//     const progressPercent = (((achieved / target) * 100) - 100).toFixed(1);
//     const trend = achieved >= target ? "up" : "down";

//     return {
//       title: goal.goalTitle.toUpperCase(),
//       subtitle: goal.description,
//       value: formattedAchieved,
//       unit: '',
//       target: formattedTarget,
//       trend,
//       trendValue: `${progressPercent}%`,
//       chartData: [target, achieved],
//     };
//   });

//   return (
//     <div className="min-h-screen mt-3">
//       <div className="grid grid-cols-1 
//           sm:grid-cols-2 
//           lg:grid-cols-3 
//           xl:grid-cols-2
//           gap-4 md:gap-5 lg:gap-6">
//         {cardsData.map((card, index) => (
//           <FinancialCard key={index} data={card} onClick={() => setSelectedCard(card)} />
//         ))}
//       </div>

//       {selectedCard && (
//         <FinancialReportModal 
//           data={selectedCard} 
//           onClose={() => setSelectedCard(null)} 
//         />
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FinancialProjections;

const FinancialProjections = () => {
    const { goals } = useCorporateGoals();
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = goals.map(goal => {
    const achieved = Number(goal.targetAchieved);
    const target = Number(goal.maintarget);

    const formattedAchieved = formatBigNumber(achieved);
    const formattedTarget = formatBigNumber(target);

    const progressPercent = (((achieved / target) * 100) - 100).toFixed(1);
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
      <div className="grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-2
          gap-4 md:gap-5 lg:gap-6">
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
//   const [selectedCard, setSelectedCard] = useState(null);

//   const cardsData = goals.map(goal => {
//     const achieved = Number(goal.targetAchieved ?? 0);
//     const target   = Number(goal.maintarget ?? 0);

//     // Optional: keep your dynamic unit logic (K, M, B, etc.)
//     const maxValue = Math.max(achieved, target);
//     const { unit, divisor } = getUnitAndDivisor(maxValue); // your existing helper

//     const formattedAchieved = formatByMagnitude(achieved, divisor);
//     const formattedTarget   = formatByMagnitude(target, divisor);

//     // For progress: show how far OVER or UNDER the target (matches dummy version)
//     const progressPercent = target !== 0 
//       ? (((achieved / target) * 100) - 100).toFixed(1) 
//       : '0.0';

//     const trend = achieved >= target ? 'up' : 'down';

//     return {
//       title: goal.goalTitle?.toUpperCase() || 'UNTITLED GOAL',
//       subtitle: goal.description || '',
//       value: formattedAchieved,
//       unit: unit || '',               // your dynamic unit (%, K, M, etc.)
//       target: formattedTarget,
//       trend,
//       trendValue: `${progressPercent}%`,
//       chartData: [target, achieved],  // raw numbers → chart can scale properly
//     };
//   });

//   return (
//     <div className="min-h-screen mt-3">
//       <div
//         className="
//           grid grid-cols-1 
//           sm:grid-cols-2 
//           lg:grid-cols-3 
//           xl:grid-cols-2
//           gap-4 md:gap-5 lg:gap-6
//         "
//       >
//         {cardsData.map((card, index) => (
//           <FinancialCard
//             key={index}
//             data={card}
//             onClick={() => setSelectedCard(card)}
//           />
//         ))}
//       </div>

//       {selectedCard && (
//         <FinancialReportModal
//           data={selectedCard}
//           onClose={() => setSelectedCard(null)}
//         />
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FinancialProjections;

 
//Number formatting helper (K, M, B with 1 decimal when needed)
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
