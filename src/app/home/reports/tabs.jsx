import { useTranslation } from 'react-i18next';

export const Tabs = () => {
  const { t } = useTranslation(); // access t function

  return [ 
    {
      key: "balanceScorecard", 
      title: t("balanceScorecard"), 
    },
    {
      key: "operationalEfficiency",
      title: t("operationalEfficiency"),
    },
    {
      key: "strategicPerformance",
      title: t("strategicPerformance"),
    },
    {
      key: "systemGoals",
      title: t("systemGoals"),
    },
    {
      key: "badges",
      title: t("badges"),
    },
  ];
};
