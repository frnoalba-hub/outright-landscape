/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AdminSEO from './pages/AdminSEO';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import Irrigation from './pages/Irrigation';
import Robots from './pages/Robots';
import SEOAudit from './pages/SEOAudit';
import ServiceArea from './pages/ServiceArea';
import arcadiaLandscaping from './pages/arcadia-landscaping';
import arcadiaSprinklerRepairInstallation from './pages/arcadia-sprinkler-repair-installation';
import azusaLandscaping from './pages/azusa-landscaping';
import azusaSprinklerRepairInstallation from './pages/azusa-sprinkler-repair-installation';
import baldwinParkLandscaping from './pages/baldwin-park-landscaping';
import baldwinParkSprinklerRepairInstallation from './pages/baldwin-park-sprinkler-repair-installation';
import charterOakLandscaping from './pages/charter-oak-landscaping';
import charterOakSprinklerRepairInstallation from './pages/charter-oak-sprinkler-repair-installation';
import claremontLandscaping from './pages/claremont-landscaping';
import claremontSprinklerRepairInstallation from './pages/claremont-sprinkler-repair-installation';
import covinaLandscaping from './pages/covina-landscaping';
import covinaSprinklerRepairInstallation from './pages/covina-sprinkler-repair-installation';
import diamondBarLandscaping from './pages/diamond-bar-landscaping';
import diamondBarSprinklerRepairInstallation from './pages/diamond-bar-sprinkler-repair-installation';
import duarteLandscaping from './pages/duarte-landscaping';
import duarteSprinklerRepairInstallation from './pages/duarte-sprinkler-repair-installation';
import elMonteLandscaping from './pages/el-monte-landscaping';
import elMonteSprinklerRepairInstallation from './pages/el-monte-sprinkler-repair-installation';
import glendoraLandscaping from './pages/glendora-landscaping';
import glendoraSprinklerRepairInstallation from './pages/glendora-sprinkler-repair-installation';
import laVerneLandscaping from './pages/la-verne-landscaping';
import laVerneSprinklerRepairInstallation from './pages/la-verne-sprinkler-repair-installation';
import monroviaLandscaping from './pages/monrovia-landscaping';
import monroviaSprinklerRepairInstallation from './pages/monrovia-sprinkler-repair-installation';
import pasadenaLandscaping from './pages/pasadena-landscaping';
import pasadenaSprinklerRepairInstallation from './pages/pasadena-sprinkler-repair-installation';
import pomonaLandscaping from './pages/pomona-landscaping';
import pomonaSprinklerRepairInstallation from './pages/pomona-sprinkler-repair-installation';
import rowlandHeightsLandscaping from './pages/rowland-heights-landscaping';
import rowlandHeightsSprinklerRepairInstallation from './pages/rowland-heights-sprinkler-repair-installation';
import sanDimasLandscaping from './pages/san-dimas-landscaping';
import sanDimasSprinklerRepairInstallation from './pages/san-dimas-sprinkler-repair-installation';
import sanGabrielLandscaping from './pages/san-gabriel-landscaping';
import sanGabrielSprinklerRepairInstallation from './pages/san-gabriel-sprinkler-repair-installation';
import templeCityLandscaping from './pages/temple-city-landscaping';
import templeCitySprinklerRepairInstallation from './pages/temple-city-sprinkler-repair-installation';
import walnutLandscaping from './pages/walnut-landscaping';
import walnutSprinklerRepairInstallation from './pages/walnut-sprinkler-repair-installation';
import westCovinaLandscaping from './pages/west-covina-landscaping';
import westCovinaSprinklerRepairInstallation from './pages/west-covina-sprinkler-repair-installation';
import Hardscape from './pages/Hardscape';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminSEO": AdminSEO,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "Home": Home,
    "Irrigation": Irrigation,
    "Robots": Robots,
    "SEOAudit": SEOAudit,
    "ServiceArea": ServiceArea,
    "arcadia-landscaping": arcadiaLandscaping,
    "arcadia-sprinkler-repair-installation": arcadiaSprinklerRepairInstallation,
    "azusa-landscaping": azusaLandscaping,
    "azusa-sprinkler-repair-installation": azusaSprinklerRepairInstallation,
    "baldwin-park-landscaping": baldwinParkLandscaping,
    "baldwin-park-sprinkler-repair-installation": baldwinParkSprinklerRepairInstallation,
    "charter-oak-landscaping": charterOakLandscaping,
    "charter-oak-sprinkler-repair-installation": charterOakSprinklerRepairInstallation,
    "claremont-landscaping": claremontLandscaping,
    "claremont-sprinkler-repair-installation": claremontSprinklerRepairInstallation,
    "covina-landscaping": covinaLandscaping,
    "covina-sprinkler-repair-installation": covinaSprinklerRepairInstallation,
    "diamond-bar-landscaping": diamondBarLandscaping,
    "diamond-bar-sprinkler-repair-installation": diamondBarSprinklerRepairInstallation,
    "duarte-landscaping": duarteLandscaping,
    "duarte-sprinkler-repair-installation": duarteSprinklerRepairInstallation,
    "el-monte-landscaping": elMonteLandscaping,
    "el-monte-sprinkler-repair-installation": elMonteSprinklerRepairInstallation,
    "glendora-landscaping": glendoraLandscaping,
    "glendora-sprinkler-repair-installation": glendoraSprinklerRepairInstallation,
    "la-verne-landscaping": laVerneLandscaping,
    "la-verne-sprinkler-repair-installation": laVerneSprinklerRepairInstallation,
    "monrovia-landscaping": monroviaLandscaping,
    "monrovia-sprinkler-repair-installation": monroviaSprinklerRepairInstallation,
    "pasadena-landscaping": pasadenaLandscaping,
    "pasadena-sprinkler-repair-installation": pasadenaSprinklerRepairInstallation,
    "pomona-landscaping": pomonaLandscaping,
    "pomona-sprinkler-repair-installation": pomonaSprinklerRepairInstallation,
    "rowland-heights-landscaping": rowlandHeightsLandscaping,
    "rowland-heights-sprinkler-repair-installation": rowlandHeightsSprinklerRepairInstallation,
    "san-dimas-landscaping": sanDimasLandscaping,
    "san-dimas-sprinkler-repair-installation": sanDimasSprinklerRepairInstallation,
    "san-gabriel-landscaping": sanGabrielLandscaping,
    "san-gabriel-sprinkler-repair-installation": sanGabrielSprinklerRepairInstallation,
    "temple-city-landscaping": templeCityLandscaping,
    "temple-city-sprinkler-repair-installation": templeCitySprinklerRepairInstallation,
    "walnut-landscaping": walnutLandscaping,
    "walnut-sprinkler-repair-installation": walnutSprinklerRepairInstallation,
    "west-covina-landscaping": westCovinaLandscaping,
    "west-covina-sprinkler-repair-installation": westCovinaSprinklerRepairInstallation,
    "Hardscape": Hardscape,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};