import AppLogo from "./../../assets/app_logo.svg";
import { Link, useLocation } from "react-router-dom";
import { LuWorkflow } from "react-icons/lu";
import { FaUsers,FaUser } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { HStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { IoIosLogOut } from "react-icons/io";

export const Header = () => {
  const location = useLocation();
  const getStyles = useCallback(
    (route: string) => {
      if (location.pathname === route) {
        return "font-semibold text-[color:--primary]";
      } else {
        return "";
      }
    },
    [location]
  );

  const onLogoutClick = useCallback(async () => {
    let res = confirm("Are you sure you want to logout?");
    if(res){
    await localStorage.clear();
    window.location.reload();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between w-full bg-[color:--secondary] p-4 items-center border-b-2 border-gray-300">
        <div className="flex flex-row gap-2 items-center">
          <img src={AppLogo} alt="App Logo" className="h-10 w-10" />
          <p className="text-xl font-bold text-gray-800 lg:text-2xl">Tick</p>
        </div>
        <div className="flex gap-8 items-center">
          <Link to="/projects">
            <HStack className={getStyles("/projects")}>
              <GoProject />
              Projects
            </HStack>
          </Link>
          <Link to="/workflows">
            <HStack className={getStyles("/workflows")}>
              <LuWorkflow />
              Workflows
            </HStack>
          </Link>
          <Link to="/users">
            <HStack gap={1} className={getStyles("/users")}>
              <FaUsers />
              Users
            </HStack>
          </Link>
          <div>
            <HStack gap={1}>
              <FaUser size={13}/>
              My Profile
            </HStack>
          </div>
          <div onClick={onLogoutClick} style={{cursor:'pointer'}}>
            <HStack gap={1}>
              <IoIosLogOut />
              Logout
            </HStack>
          </div>
        </div>
      </div>
    </div>
  );
};
