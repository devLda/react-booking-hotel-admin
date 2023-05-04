// component
import SvgColor from '../UI/svg-color';

// ----------------------------------------------------------------------
import ic_analytics from '../../assets/icons/navbar/ic_analytics.svg'
import ic_user from '../../assets/icons/navbar/ic_user.svg'
import ic_blog from '../../assets/icons/navbar/ic_blog.svg'
import ic_lock from '../../assets/icons/navbar/ic_lock.svg'
import ic_cart from '../../assets/icons/navbar/ic_cart.svg'
import ic_disabled from '../../assets/icons/navbar/ic_disabled.svg'

const icon = (name) => <SvgColor src={name} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon(ic_disabled),
  },
  {
    title: 'Reservation',
    path: '/dashboard/reservation',
    icon: icon(ic_cart),
  },
  {
    title: 'Invoice',
    path: '/dashboard/invoice',
    icon: icon(ic_blog),
  },
  {
    title: 'Reports',
    path: '/dashboard/report',
    icon: icon(ic_analytics),
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: icon(ic_user),
  },
  {
    title: 'Setting',
    path: '/404',
    icon: icon(ic_lock),
  },
];

export default navConfig;
