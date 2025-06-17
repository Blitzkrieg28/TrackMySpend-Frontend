import { useState } from "react";
import {
  HiMenu,
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";

export default function SidebarComponent() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } bg-customBlack text-!customLavender shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#ffffff] text-!customLavender">
        <button onClick={() => setCollapsed(!collapsed)}>
          <HiMenu className="w-6 h-6" />
        </button>
        
      </div>

      {/* Menu */}
      <nav className="flex flex-col px-2 py-4 space-y-2 text-sm">
        <SidebarLink icon={HiChartPie} label="Dashboard" collapsed={collapsed} />
        <SidebarLink icon={HiViewBoards} label="Income" collapsed={collapsed} />
        <SidebarLink icon={HiInbox} label="Expense" collapsed={collapsed} />
        <SidebarLink icon={HiUser} label="Budget" collapsed={collapsed} />
        <SidebarLink icon={HiShoppingBag} label="Report" collapsed={collapsed} />
        <SidebarLink icon={HiArrowSmRight} label="Sign In" collapsed={collapsed} />
        <SidebarLink icon={HiTable} label="Sign Up" collapsed={collapsed} />

        <div className="border-t border-gray-700 pt-4">
          <SidebarLink icon={HiChartPie} label="Upgrade to Pro" collapsed={collapsed} />
          <SidebarLink icon={BiBuoy} label="Help" collapsed={collapsed} />
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ icon: Icon, label, collapsed }) {
  return (
    <a
      href="#"
      className="flex items-center p-2 text-!customLavender rounded hover:bg-gray-700 transition-colors"
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span className="ml-3">{label}</span>}
    </a>
  );
}
