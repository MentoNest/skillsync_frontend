import { Outlet } from "react-router-dom";
import authImage from "../../assets/auth-image.jpg";
import { SvgIcons } from "../../assets/svg/svg";
export const AuthLayout = () => {
  return (
    <div className="h-screen flex justify-between bg-white gap-10 lg:flex-row flex-col">
      <div className=" w-full lg:w-1/2 xl:px-[5.26rem]  h-full flex items-center justify-center px-5">
        <div className="lg:max-w-[3175rem] md:w-fit xl:px-[5.26rem] w-full space-y-14">
          {SvgIcons.skillSyncLogo()}
          <Outlet />
        </div>{" "}
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-white">
        <img src={authImage} alt="" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};
