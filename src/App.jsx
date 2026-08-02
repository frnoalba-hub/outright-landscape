import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import BlogPost from './pages/BlogPost'
import ServiceHubPage from './pages/ServiceHubPage'
import BuyerGuidePage from './pages/BuyerGuidePage'
import About from './pages/About'
import Contact from './pages/Contact'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

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
    </>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
