// components/index.js - Export all components for easier imports

// Common Components
export { default as Button } from './common/Button';
export { default as LoadingSpinner } from './common/LoadingSpinner';
export { default as SEO } from './common/SEO';

// Layout Components
export { default as Navbar } from './layouts/Navbar';
export { default as Footer } from './layouts/Footer';
export { default as PageContainer } from './layouts/PageContainer';

// UI Components
export { default as Badge } from './ui/Badge';
export { default as Loading } from './ui/Loading';
export { default as Table } from './ui/Table';
export { default as Tabs } from './ui/Tabs';
export { default as Alert } from './ui/Alert';
export { default as Card } from './ui/Card';
export { default as Modal } from './ui/Modal';
export { default as Dropdown } from './ui/Dropdown';
export { default as Toast } from './ui/Toast';

// Table Helpers - NEW (Để thay thế code lặp trong tables)
export {
  TableContainer,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  StatusBadge as TableStatusBadge,
  ActionButton,
  Pagination,
  EmptyState,
  SearchInput
} from './ui/TableHelpers';

// Layout Helpers - NEW (Để rút gọn code UI)
export {
  Container,
  Section,
  Grid,
  Stack,
  Inline,
  Card as LayoutCard,
  PageHeader,
  FormGroup,
  StatusBadge as LayoutStatusBadge,
  Icon,
  Divider
} from './layout/index.jsx';

// Home Components
export { default as FeaturesSection } from './home/FeaturesSection';
export { default as StatsSection } from './home/StatsSection';
export { default as HeroSection } from './home/HeroSection';
export { default as CTASection } from './home/CTASection';

// Form Components
export { default as Input } from './forms/Input';
export { default as Select } from './forms/Select';
export { default as Textarea } from './forms/Textarea';
export { default as LoginForm } from './forms/LoginForm';
export { default as RegisterForm } from './forms/RegisterForm';

// Admin Components (nếu có)
// export { default as AdminSidebar } from './admin/AdminSidebar';
// export { default as UserManagementTable } from './admin/UserManagementTable';

// Common Data Components (nếu có)
// export { default as DataTable } from './common/DataTable';

// User Components (nếu có)
// export { default as ProfileTab } from './user/ProfileTab';
