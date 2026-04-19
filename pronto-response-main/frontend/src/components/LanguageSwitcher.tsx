import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="en">English</option>
      <option value="ta">தமிழ்</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
};

export default LanguageSwitcher;
