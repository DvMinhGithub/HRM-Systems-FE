import routes from '@/configs/routes';
import {
  AppstoreOutlined,
  UserOutlined,
  BarChartOutlined,
  ClusterOutlined,
  AuditOutlined,
  DollarOutlined,
  BellOutlined,
  SettingOutlined
} from '@ant-design/icons-vue';

export const menuRouter = [
  {
    path: routes.home,
    pageIcon: AppstoreOutlined,
    label: 'Trang chủ'
  },
  {
    path: routes.employee,
    pageIcon: UserOutlined,
    label: 'Nhân viên'
  },
  {
    path: routes.report,
    pageIcon: BarChartOutlined,
    label: 'Báo cáo'
  },
  {
    path: routes.department,
    pageIcon: ClusterOutlined,
    label: 'Phòng ban'
  },
  {
    path: routes.contract,
    pageIcon: AuditOutlined,
    label: 'Hợp đồng'
  },
  {
    path: routes.benefit,
    pageIcon: DollarOutlined,
    label: 'Quyền lợi'
  },
  {
    path: routes.notifcation,
    pageIcon: BellOutlined,
    label: 'Thông báo'
  },
  {
    path: routes.settings,
    pageIcon: SettingOutlined,
    label: 'Phân quyền'
  }
];
