// UI Helpers - Expanded with more utilities
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to combine class names with proper merging
export const cn = (...classes) => twMerge(clsx(classes));

// Common spacing utilities
export const spacing = {
  // Padding
  p0: 'p-0', p1: 'p-1', p2: 'p-2', p3: 'p-3', p4: 'p-4', p5: 'p-5', p6: 'p-6', p8: 'p-8', p10: 'p-10', p12: 'p-12', p16: 'p-16', p20: 'p-20', p24: 'p-24',
  px1: 'px-1', px2: 'px-2', px3: 'px-3', px4: 'px-4', px5: 'px-5', px6: 'px-6', px8: 'px-8', px12: 'px-12', px16: 'px-16',
  py1: 'py-1', py2: 'py-2', py3: 'py-3', py4: 'py-4', py5: 'py-5', py6: 'py-6', py8: 'py-8', py12: 'py-12', py16: 'py-16', py20: 'py-20', py24: 'py-24',
  
  // Margin
  m0: 'm-0', m1: 'm-1', m2: 'm-2', m3: 'm-3', m4: 'm-4', m5: 'm-5', m6: 'm-6', m8: 'm-8', m10: 'm-10', m12: 'm-12', m16: 'm-16', m20: 'm-20', m24: 'm-24',
  mx1: 'mx-1', mx2: 'mx-2', mx3: 'mx-3', mx4: 'mx-4', mx5: 'mx-5', mx6: 'mx-6', mx8: 'mx-8', mx12: 'mx-12', mx16: 'mx-16', mxAuto: 'mx-auto',
  my1: 'my-1', my2: 'my-2', my3: 'my-3', my4: 'my-4', my5: 'my-5', my6: 'my-6', my8: 'my-8', my12: 'my-12', my16: 'my-16', my20: 'my-20', my24: 'my-24',
  
  // Margin Top/Bottom/Left/Right
  mt1: 'mt-1', mt2: 'mt-2', mt3: 'mt-3', mt4: 'mt-4', mt6: 'mt-6', mt8: 'mt-8', mt12: 'mt-12', mt16: 'mt-16', mt20: 'mt-20', mt24: 'mt-24',
  mb1: 'mb-1', mb2: 'mb-2', mb3: 'mb-3', mb4: 'mb-4', mb6: 'mb-6', mb8: 'mb-8', mb12: 'mb-12', mb16: 'mb-16', mb20: 'mb-20', mb24: 'mb-24',
  ml1: 'ml-1', ml2: 'ml-2', ml3: 'ml-3', ml4: 'ml-4', ml6: 'ml-6', ml8: 'ml-8', ml12: 'ml-12', ml16: 'ml-16',
  mr1: 'mr-1', mr2: 'mr-2', mr3: 'mr-3', mr4: 'mr-4', mr6: 'mr-6', mr8: 'mr-8', mr12: 'mr-12', mr16: 'mr-16',
  
  // Gap
  gap1: 'gap-1', gap2: 'gap-2', gap3: 'gap-3', gap4: 'gap-4', gap6: 'gap-6', gap8: 'gap-8', gap12: 'gap-12', gap16: 'gap-16'
};

// Flexbox utilities
export const flex = {
  // Display
  flex: 'flex',
  inlineFlex: 'inline-flex',
  
  // Direction
  row: 'flex-row',
  rowReverse: 'flex-row-reverse',
  col: 'flex-col',
  colReverse: 'flex-col-reverse',
  
  // Wrap
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  wrapReverse: 'flex-wrap-reverse',
  
  // Align Items
  itemsStart: 'items-start',
  itemsEnd: 'items-end',
  itemsCenter: 'items-center',
  itemsBaseline: 'items-baseline',
  itemsStretch: 'items-stretch',
  
  // Justify Content
  justifyStart: 'justify-start',
  justifyEnd: 'justify-end',
  justifyCenter: 'justify-center',
  justifyBetween: 'justify-between',
  justifyAround: 'justify-around',
  justifyEvenly: 'justify-evenly',
  
  // Flex grow/shrink/basis
  flex1: 'flex-1',
  flexAuto: 'flex-auto',
  flexInitial: 'flex-initial',
  flexNone: 'flex-none',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  shrink0: 'flex-shrink-0',
  
  // Common combinations
  center: 'flex items-center justify-center',
  centerStart: 'flex items-center justify-start',
  centerEnd: 'flex items-center justify-end',
  centerBetween: 'flex items-center justify-between'
};

// Grid utilities
export const grid = {
  grid: 'grid',
  inlineGrid: 'inline-grid',
  
  // Grid Template Columns
  cols1: 'grid-cols-1',
  cols2: 'grid-cols-2', 
  cols3: 'grid-cols-3',
  cols4: 'grid-cols-4',
  cols5: 'grid-cols-5',
  cols6: 'grid-cols-6',
  cols12: 'grid-cols-12',
  colsNone: 'grid-cols-none',
  
  // Grid Template Rows
  rows1: 'grid-rows-1',
  rows2: 'grid-rows-2',
  rows3: 'grid-rows-3',
  rows4: 'grid-rows-4',
  rows6: 'grid-rows-6',
  rowsNone: 'grid-rows-none',
  
  // Gap
  gap0: 'gap-0',
  gap1: 'gap-1',
  gap2: 'gap-2',
  gap3: 'gap-3',
  gap4: 'gap-4',
  gap6: 'gap-6',
  gap8: 'gap-8',
  gap12: 'gap-12',
  gap16: 'gap-16',
  
  // Auto-fit/fill
  autoFit: 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]',
  autoFill: 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'
};

// Typography utilities
export const typography = {
  // Font sizes
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  
  // Font weights
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
  
  // Common heading combinations
  heading1: 'text-3xl font-bold',
  heading2: 'text-2xl font-bold',
  heading3: 'text-xl font-bold',
  heading4: 'text-lg font-semibold',
  hero: 'text-4xl md:text-5xl font-bold',
  lead: 'text-xl',
  
  // Text alignment
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  
  // Line height
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose'
};

// Color utilities
export const colors = {
  text: {
    primary: 'text-neutral-900',
    secondary: 'text-neutral-600',
    muted: 'text-neutral-500',
    disabled: 'text-neutral-400',
    white: 'text-white',
    
    // Brand colors
    brand: 'text-primary-600',
    brandLight: 'text-primary-500',
    brandDark: 'text-primary-700',
    
    // Status colors
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600'
  },
  
  bg: {
    primary: 'bg-white',
    secondary: 'bg-neutral-50',
    muted: 'bg-neutral-100',
    accent: 'bg-primary-50',
    
    // Brand backgrounds
    brand: 'bg-primary-600',
    brandLight: 'bg-primary-500',
    brandDark: 'bg-primary-700',
    
    // Status backgrounds
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50',
    info: 'bg-blue-50'
  },
  
  border: {
    default: 'border-neutral-200',
    muted: 'border-neutral-100',
    strong: 'border-neutral-300',
    brand: 'border-primary-200',
    
    // Status borders
    success: 'border-green-200',
    warning: 'border-yellow-200',
    error: 'border-red-200',
    info: 'border-blue-200'
  }
};

// Animation utilities
export const animation = {
  // Transition
  transition: 'transition-all duration-300',
  transitionFast: 'transition-all duration-150',
  transitionSlow: 'transition-all duration-500',
  
  // Hover effects
  hover: 'hover:scale-105 transition-transform duration-300',
  hoverLift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300',
  hoverGlow: 'hover:shadow-primary-500/25 hover:shadow-lg transition-all duration-300',
  
  // Animation classes
  fadeIn: 'animate-fadeIn',
  fadeInUp: 'animate-fadeInUp',
  fadeInDown: 'animate-fadeInDown',
  slideInLeft: 'animate-slideInLeft',
  slideInRight: 'animate-slideInRight',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
  
  // Animation delays
  delay100: 'animate-delay-100',
  delay200: 'animate-delay-200',
  delay300: 'animate-delay-300',
  delay500: 'animate-delay-500'
};

// Responsive utilities
export const responsive = {
  sm: {
    px2: 'sm:px-2', px4: 'sm:px-4', px6: 'sm:px-6', px8: 'sm:px-8',
    text: { lg: 'sm:text-lg', xl: 'sm:text-xl', '2xl': 'sm:text-2xl' },
    grid: { cols2: 'sm:grid-cols-2', cols3: 'sm:grid-cols-3' }
  },
  md: {
    px6: 'md:px-6', px8: 'md:px-8', px12: 'md:px-12',
    text: { xl: 'md:text-xl', '2xl': 'md:text-2xl', '3xl': 'md:text-3xl', '5xl': 'md:text-5xl' },
    grid: { cols2: 'md:grid-cols-2', cols3: 'md:grid-cols-3', cols4: 'md:grid-cols-4' },
    flex: { row: 'md:flex-row' }
  },
  lg: {
    px8: 'lg:px-8', px12: 'lg:px-12', px16: 'lg:px-16',
    text: { '2xl': 'lg:text-2xl', '4xl': 'lg:text-4xl', '5xl': 'lg:text-5xl' },
    grid: { cols2: 'lg:grid-cols-2', cols3: 'lg:grid-cols-3', cols4: 'lg:grid-cols-4' }
  }
};

// Shadow utilities
export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  default: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  
  // Colored shadows
  primary: 'shadow-primary-500/25',
  success: 'shadow-green-500/25',
  warning: 'shadow-yellow-500/25',
  error: 'shadow-red-500/25'
};

// Border radius utilities  
export const rounded = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  default: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
};

// Table utilities
export const table = {
  // Base table classes
  table: 'min-w-full divide-y divide-gray-200',
  tableContainer: 'overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg',
  
  // Header classes
  thead: 'bg-gray-50',
  th: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  thCenter: 'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
  thSortable: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group',
  
  // Body classes
  tbody: 'bg-white divide-y divide-gray-200',
  td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
  tdCenter: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center',
  
  // Row classes
  row: 'hover:bg-gray-50 transition-colors',
  rowSelected: 'bg-blue-50 hover:bg-blue-100',
  
  // Footer classes
  tfoot: 'bg-gray-50 px-6 py-3 border-t border-gray-200'
};

// Form utilities
export const form = {
  // Form groups
  group: 'space-y-1',
  groupRow: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
  
  // Labels
  label: 'block text-sm font-medium text-gray-700',
  labelRequired: 'block text-sm font-medium text-gray-700 after:content-["*"] after:text-red-500 after:ml-1',
  
  // Inputs
  input: cn(
    'block w-full px-3 py-2 border border-gray-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:bg-gray-50 disabled:text-gray-500',
    'transition-colors duration-200'
  ),
  
  inputError: cn(
    'block w-full px-3 py-2 border border-red-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
    'transition-colors duration-200'
  ),
  
  // Select
  select: cn(
    'block w-full px-3 py-2 border border-gray-300 rounded-md bg-white',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:bg-gray-50 disabled:text-gray-500',
    'transition-colors duration-200'
  ),
  
  // Textarea
  textarea: cn(
    'block w-full px-3 py-2 border border-gray-300 rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:bg-gray-50 disabled:text-gray-500',
    'resize-vertical min-h-[100px]',
    'transition-colors duration-200'
  ),
  
  // Checkbox & Radio
  checkbox: cn(
    'h-4 w-4 text-primary-600 border-gray-300 rounded',
    'focus:ring-primary-500 focus:ring-2'
  ),
  
  radio: cn(
    'h-4 w-4 text-primary-600 border-gray-300',
    'focus:ring-primary-500 focus:ring-2'
  ),
  
  // Error text
  error: 'text-sm text-red-600 mt-1',
  
  // Help text
  help: 'text-sm text-gray-500 mt-1'
};

// Layout utilities for specific components
export const layout = {
  // Page layouts
  page: 'min-h-screen bg-gray-50',
  pageAuth: 'min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center',
  
  // Content areas
  main: 'flex-1 py-6',
  content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contentNarrow: 'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Sidebars
  sidebar: 'w-64 bg-white shadow-sm border-r border-gray-200',
  sidebarContent: 'flex flex-col h-full px-4 py-6',
  
  // Headers
  header: 'bg-white shadow-sm border-b border-gray-200',
  headerContent: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4',
  
  // Cards in grids
  cardGrid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
  cardGridFull: 'grid grid-cols-1 gap-6',
  
  // Modals
  modalOverlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
  modalContent: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4',
  modalHeader: 'px-6 py-4 border-b border-gray-200',
  modalBody: 'px-6 py-4',
  modalFooter: 'px-6 py-4 border-t border-gray-200 flex justify-end space-x-3'
};

// Status indicators
export const status = {
  // Badge variants
  badge: {
    success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
    warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
    error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
    info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
    neutral: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  },
  
  // Dot indicators
  dot: {
    success: 'w-2 h-2 bg-green-400 rounded-full',
    warning: 'w-2 h-2 bg-yellow-400 rounded-full',
    error: 'w-2 h-2 bg-red-400 rounded-full',
    info: 'w-2 h-2 bg-blue-400 rounded-full',
    neutral: 'w-2 h-2 bg-gray-400 rounded-full'
  }
};

// Navigation utilities
export const nav = {
  // Navigation bars
  navbar: 'bg-white shadow-sm border-b border-gray-200',
  navbarContent: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Navigation links
  link: cn(
    'text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium',
    'transition-colors duration-200'
  ),
  
  linkActive: cn(
    'text-primary-600 bg-primary-50 px-3 py-2 rounded-md text-sm font-medium'
  ),
  
  // Breadcrumbs
  breadcrumb: 'flex items-center space-x-2 text-sm text-gray-500',
  breadcrumbLink: 'hover:text-gray-700 transition-colors',
  breadcrumbSeparator: 'text-gray-400',
  
  // Tabs
  tabs: 'border-b border-gray-200',
  tabsList: 'flex space-x-8',
  tab: cn(
    'py-2 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500',
    'hover:text-gray-700 hover:border-gray-300 transition-colors'
  ),
  tabActive: cn(
    'py-2 px-1 border-b-2 border-primary-500 text-sm font-medium text-primary-600'
  )
};

// Alert/notification utilities
export const alert = {
  container: 'rounded-md p-4',
  
  variants: {
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800'
  },
  
  title: 'font-medium text-sm',
  message: 'text-sm mt-1',
  
  icon: {
    success: 'text-green-400',
    warning: 'text-yellow-400', 
    error: 'text-red-400',
    info: 'text-blue-400'
  }
};

// Loading states
export const loading = {
  spinner: 'animate-spin h-5 w-5 text-primary-600',
  skeleton: 'animate-pulse bg-gray-200 rounded',
  overlay: 'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center'
};

// Update common patterns
export const patterns = {
  // Common card styles
  card: cn(
    'bg-white border border-neutral-200 rounded-lg shadow-sm',
    'hover:shadow-md transition-shadow duration-300'
  ),
  
  cardProfessional: cn(
    'bg-white border border-neutral-200 rounded-xl shadow-sm',
    'hover:shadow-lg hover:border-neutral-300 transition-all duration-300'
  ),
  
  cardGlass: cn(
    'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
    'hover:bg-white/20 transition-all duration-300'
  ),
  
  // Button patterns
  btnPrimary: cn(
    'bg-primary-600 text-white px-4 py-2 rounded-lg font-medium',
    'hover:bg-primary-700 active:bg-primary-800',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'transition-colors duration-200'
  ),
  
  btnSecondary: cn(
    'bg-white text-neutral-700 border border-neutral-300 px-4 py-2 rounded-lg font-medium',
    'hover:bg-neutral-50 hover:border-neutral-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'transition-colors duration-200'
  ),
  
  // Form patterns
  input: cn(
    'w-full px-3 py-2 border border-neutral-300 rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'transition-colors duration-200'
  ),
  
  label: cn(
    'block text-sm font-medium text-neutral-700 mb-1'
  ),
  
  // Table patterns
  tableHeader: table.th,
  tableHeaderCenter: table.thCenter,
  tableCell: table.td,
  tableCellCenter: table.tdCenter,
  
  // Form patterns
  formGroup: form.group,
  formLabel: form.label,
  formInput: form.input,
  formSelect: form.select,
  formTextarea: form.textarea,
  formError: form.error,
  
  // Status patterns
  statusSuccess: status.badge.success,
  statusWarning: status.badge.warning,
  statusError: status.badge.error,
  statusInfo: status.badge.info,
  
  // Navigation patterns
  navLink: nav.link,
  navLinkActive: nav.linkActive,
  
  // Layout patterns
  pageLayout: layout.page,
  contentArea: layout.content,
};
