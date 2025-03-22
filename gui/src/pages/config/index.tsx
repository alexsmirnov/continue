import {
  AcademicCapIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useNavigationListener } from "../../hooks/useNavigationListener";
import { getFontSize } from "../../util";
import { AccountButton } from "./AccountButton";
import { HelpCenterSection } from "./HelpCenterSection";
import { IndexingSettingsSection } from "./IndexingSettingsSection";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { UserSettingsForm } from "./UserSettingsForm";

type TabOption = {
  id: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};

function ConfigPage() {
  useNavigationListener();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const tabs: TabOption[] = [
    {
      id: "settings",
      label: "Settings",
      component: <UserSettingsForm />,
      icon: <Cog6ToothIcon className="h-4 w-4" />,
    },
    {
      id: "indexing",
      label: "Indexing",
      component: <IndexingSettingsSection />,
      icon: <CircleStackIcon className="h-4 w-4" />,
    },
    {
      id: "help",
      label: "Help",
      component: <HelpCenterSection />,
      icon: <QuestionMarkCircleIcon className="h-4 w-4" />,
    },
    {
      id: "shortcuts",
      label: "Shortcuts",
      component: <KeyboardShortcuts />,
      icon: <AcademicCapIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="bg-vsc-background sticky top-0 z-10">
        <PageHeader
          showBorder
          onTitleClick={() => navigate("/")}
          title="Chat"
          rightContent={<AccountButton />}
        />

        {/* Tab Headers */}
        <div className="flex w-full justify-center border-0 border-b-[1px] border-solid border-b-zinc-700">
          {tabs.map((tab) => (
            <div
              style={{
                fontSize: `${getFontSize() - 2}px`,
              }}
              key={tab.id}
              className={`hover:bg-vsc-input-background flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 ${activeTab === tab.id ? "" : "text-gray-400"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-4">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

export default ConfigPage;
