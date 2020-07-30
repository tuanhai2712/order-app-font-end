// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Assessment from '@material-ui/icons/Assessment';
import CropFree from '@material-ui/icons/CropFree';
import PeopleIcon from '@material-ui/icons/People';
// core components/views for Admin layout
import Overview from "views/Admin/Overview/Overview.js";
import OrderCheck from "views/Admin/Order/OrderCheck.js";
import Users from "views/Admin/Account/Users.js";
import BarCode from "views/Admin/Check/BarCode.js";
import ImportListConsignment from "views/Admin/Check/ImportListConsignment.js";
import Revenue from "./Report/Revenue";
import Debt from "./Report/Debt";
import role from "constants/role";

const dashboardRoutes = [
  {
    path: "/tong-quan",
    name: "Tổng quan",
    icon: Dashboard,
    component: Overview,
    layout: "/admin",
  },
  {
    path: "/don-hang",
    name: "Kiểm tra đơn hàng",
    icon: "content_paste",
    component: OrderCheck,
    layout: "/admin",
  },
  {
    path: "/nhap-don",
    name: "Nhập đơn",
    icon: CropFree,
    layout: "/admin",
    role: role.admin_role,
    sub: [
      // {
      //   subPath: "/check-ma-van-don",
      //   name: "Check mã vận đơn",
      //   component: BarCode
      // },
      {
        subPath: "/nhap-danh-sach-ma-van-don",
        name: "Nhập danh sách",
        component: ImportListConsignment
      },
    ]
  },
  {
    path: "/tai-khoan",
    name: "Tài khoản",
    icon: PeopleIcon,
    component: Users,
    layout: "/admin",
    role: role.admin_role
  },
  {
    path: "/bao-cao",
    name: "Báo cáo",
    icon: Assessment,
    layout: "/admin",
    role: role.admin_role,
    sub: [
      {
        subPath: "/doanh-thu",
        name: "Doanh thu",
        component: Revenue
      },
      {
        subPath: "/cong-no",
        name: "Công nợ",
        component: Debt
      },
    ]
  },
];

export default dashboardRoutes;
