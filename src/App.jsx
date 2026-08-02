import './App.css'
import { lazy, Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import Layout from './Layout.jsx'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

const pageModules = import.meta.glob('./pages/*.jsx');
const lazyPage = (name) => lazy(pageModules[`./pages/${name}.jsx`]);
const SPECIAL_PAGE_NAMES = new Set(['About', 'BlogPost', 'BuyerGuidePage', 'Contact', 'ServiceHubPage']);
const Pages = Object.fromEntries(
  Object.entries(pageModules)
    .map(([path, loader]) => [path.split('/').pop().replace(/\.jsx$/, ''), lazy(loader)])
    .filter(([name]) => !SPECIAL_PAGE_NAMES.has(name))
);

const mainPageKey = 'Home';
const MainPage = Pages[mainPageKey];
const About = lazyPage('About');
const BlogPost = lazyPage('BlogPost');
const BuyerGuidePage = lazyPage('BuyerGuidePage');
const Contact = lazyPage('Contact');
const ServiceHubPage = lazyPage('ServiceHubPage');
const PageNotFound = lazy(() => import('./lib/PageNotFound'));
const UserNotRegisteredError = lazy(() => import('@/components/UserNotRegisteredError'));
const VisualEditAgent = lazy(() => import('@/lib/VisualEditAgent'));

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const PageLoading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white" role="status" aria-live="polite">
    <span className="sr-only">Loading page</span>
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" aria-hidden="true" />
  </div>
);

const PAGE_PATHS = {
  Blog: 'blog',
  Hardscape: 'hardscape',
  Irrigation: 'irrigation',
  PrivacyPolicy: 'privacy-policy',
};

const LEGACY_PATHS = {
  '/home': '/',
  '/s/hardscaping': '/hardscape',
  '/s/irrigation': '/irrigation',
};

const pagePath = (pageName) => PAGE_PATHS[pageName] ?? pageName.toLowerCase();

function CanonicalPathRedirect() {
  const location = useLocation();
  const pathWithoutTrailingSlash = location.pathname.replace(/\/+$/, '') || '/';
  const lowercasePath = pathWithoutTrailingSlash.toLowerCase();
  const searchParams = new URLSearchParams(location.search);

  if (lowercasePath === '/blogpost') {
    const slug = searchParams.get('slug')?.trim().toLowerCase();
    return <Navigate to={slug ? `/blog/${encodeURIComponent(slug)}` : '/blog'} replace />;
  }

  if (lowercasePath === '/servicearea' || lowercasePath === '/service-area') {
    const city = searchParams.get('city')?.trim().toLowerCase();
    const cityPage = city && Pages[`${city}-landscaping`];
    return <Navigate to={cityPage ? `/${city}-landscaping` : '/#service-areas'} replace />;
  }

  const knownCanonicalPaths = new Set([
    '/',
    ...Object.keys(Pages).filter((name) => name !== mainPageKey).map((name) => `/${pagePath(name)}`),
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
  ]);
  const dynamicCanonicalPath = /^\/(blog|guides)\/[a-z0-9-]+$/.test(lowercasePath)
    || /^\/s\/[a-z0-9-]+$/.test(lowercasePath);
  const canonicalPath = LEGACY_PATHS[lowercasePath]
    ?? (knownCanonicalPaths.has(lowercasePath) || dynamicCanonicalPath ? lowercasePath : null);

  if (canonicalPath && canonicalPath !== location.pathname) {
    return <Navigate to={`${canonicalPath}${location.search}${location.hash}`} replace />;
  }

  return null;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <>
      <CanonicalPathRedirect />
      <Suspense fallback={<PageLoading />}>
      <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).filter(([path]) => path !== mainPageKey).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${pagePath(path)}`}
          caseSensitive
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route
        path="/blog/:slug"
        element={
          <LayoutWrapper currentPageName="BlogPost">
            <BlogPost />
          </LayoutWrapper>
        }
      />
      <Route
        path="/s/:slug"
        element={
          <LayoutWrapper currentPageName="ServiceHub">
            <ServiceHubPage />
          </LayoutWrapper>
        }
      />
      <Route
        path="/guides/:slug"
        element={
          <LayoutWrapper currentPageName="BuyerGuide">
            <BuyerGuidePage />
          </LayoutWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <LayoutWrapper currentPageName="About">
            <About />
          </LayoutWrapper>
        }
      />
      <Route
        path="/contact"
        element={
          <LayoutWrapper currentPageName="Contact">
            <Contact />
          </LayoutWrapper>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </>
  );
};


function App() {
  const isEmbeddedEditor = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        {isEmbeddedEditor && (
          <Suspense fallback={null}>
            <VisualEditAgent />
          </Suspense>
        )}
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
