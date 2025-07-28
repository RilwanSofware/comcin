import GeneralSettings from "@/Component/Admin/Settings/GeneralSettings";
import MyAccount from "@/Component/Admin/Settings/MyAccount";
import Notification from "@/Component/Admin/Settings/Notification";
import SecuritySettings from "@/Component/Admin/Settings/SecuritySettings";
import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General Settings" },
    { key: "security", label: "Security Settings" },
    { key: "notifications", label: "Notification Preferences" },
    { key: "account", label: "My Account" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Settings
          </h1>
          <p className="text-sm text-gray-500">
            Configure general settings, security, and notifications.
          </p>
        </div>
      </div>

      {/* Tabs */}

      <div className="bg-white p-4 rounded-lg ">
        <div className="border-b px-4">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium ${
                  activeTab === tab.key
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-4">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <Notification />}
          {activeTab === "account" && <MyAccount />}
        </div>
      </div>
    </div>
  );
}
