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
import azusaLandscaping from './pages/azusa-landscaping';
import baldwinParkLandscaping from './pages/baldwin-park-landscaping';
import charterOakLandscaping from './pages/charter-oak-landscaping';
import claremontLandscaping from './pages/claremont-landscaping';
import covinaLandscape from './pages/covina-landscape';
import covinaLandscaping from './pages/covina-landscaping';
import diamondBarLandscaping from './pages/diamond-bar-landscaping';
import duarteLandscaping from './pages/duarte-landscaping';
import elMonteLandscaping from './pages/el-monte-landscaping';
import glendoraLandscaping from './pages/glendora-landscaping';
import laVerneLandscaping from './pages/la-verne-landscaping';
import monroviaLandscaping from './pages/monrovia-landscaping';
import pasadenaLandscaping from './pages/pasadena-landscaping';
import pomonaLandscaping from './pages/pomona-landscaping';
import rowlandHeightsLandscaping from './pages/rowland-heights-landscaping';
import sanDimasLandscaping from './pages/san-dimas-landscaping';
import sanGabrielLandscaping from './pages/san-gabriel-landscaping';
import templeCityLandscaping from './pages/temple-city-landscaping';
import walnutLandscaping from './pages/walnut-landscaping';
import westCovinaLandscaping from './pages/west-covina-landscaping';
import arcadiaSprinklerRepairInstallation from './pages/arcadia-sprinkler-repair-installation';
import azusaSprinklerRepairInstallation from './pages/azusa-sprinkler-repair-installation';
import baldwinParkSprinklerRepairInstallation from './pages/baldwin-park-sprinkler-repair-installation';
import charterOakSprinklerRepairInstallation from './pages/charter-oak-sprinkler-repair-installation';
import claremontSprinklerRepairInstallation from './pages/claremont-sprinkler-repair-installation';
import covinaSprinklerRepairInstallation from './pages/covina-sprinkler-repair-installation';
import diamondBarSprinklerRepairInstallation from './pages/diamond-bar-sprinkler-repair-installation';
import duarteSprinklerRepairInstallation from './pages/duarte-sprinkler-repair-installation';
import elMonteSprinklerRepairInstallation from './pages/el-monte-sprinkler-repair-installation';
import glendoraSprinklerRepairInstallation from './pages/glendora-sprinkler-repair-installation';
import laVerneSprinklerRepairInstallation from './pages/la-verne-sprinkler-repair-installation';
import monroviaSprinklerRepairInstallation from './pages/monrovia-sprinkler-repair-installation';
import pasadenaSprinklerRepairInstallation from './pages/pasadena-sprinkler-repair-installation';
import pomonaSprinklerRepairInstallation from './pages/pomona-sprinkler-repair-installation';
import rowlandHeightsSprinklerRepairInstallation from './pages/rowland-heights-sprinkler-repair-installation';
import sanDimasSprinklerRepairInstallation from './pages/san-dimas-sprinkler-repair-installation';
import sanGabrielSprinklerRepairInstallation from './pages/san-gabriel-sprinkler-repair-installation';
import templeCitySprinklerRepairInstallation from './pages/temple-city-sprinkler-repair-installation';
import walnutSprinklerRepairInstallation from './pages/walnut-sprinkler-repair-installation';
import westCovinaSprinklerRepairInstallation from './pages/west-covina-sprinkler-repair-installation';
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
    "azusa-landscaping": azusaLandscaping,
    "baldwin-park-landscaping": baldwinParkLandscaping,
    "charter-oak-landscaping": charterOakLandscaping,
    "claremont-landscaping": claremontLandscaping,
    "covina-landscape": covinaLandscape,
    "covina-landscaping": covinaLandscaping,
    "diamond-bar-landscaping": diamondBarLandscaping,
    "duarte-landscaping": duarteLandscaping,
    "el-monte-landscaping": elMonteLandscaping,
    "glendora-landscaping": glendoraLandscaping,
    "la-verne-landscaping": laVerneLandscaping,
    "monrovia-landscaping": monroviaLandscaping,
    "pasadena-landscaping": pasadenaLandscaping,
    "pomona-landscaping": pomonaLandscaping,
    "rowland-heights-landscaping": rowlandHeightsLandscaping,
    "san-dimas-landscaping": sanDimasLandscaping,
    "san-gabriel-landscaping": sanGabrielLandscaping,
    "temple-city-landscaping": templeCityLandscaping,
    "walnut-landscaping": walnutLandscaping,
    "west-covina-landscaping": westCovinaLandscaping,
    "arcadia-sprinkler-repair-installation": arcadiaSprinklerRepairInstallation,
    "azusa-sprinkler-repair-installation": azusaSprinklerRepairInstallation,
    "baldwin-park-sprinkler-repair-installation": baldwinParkSprinklerRepairInstallation,
    "charter-oak-sprinkler-repair-installation": charterOakSprinklerRepairInstallation,
    "claremont-sprinkler-repair-installation": claremontSprinklerRepairInstallation,
    "covina-sprinkler-repair-installation": covinaSprinklerRepairInstallation,
    "diamond-bar-sprinkler-repair-installation": diamondBarSprinklerRepairInstallation,
    "duarte-sprinkler-repair-installation": duarteSprinklerRepairInstallation,
    "el-monte-sprinkler-repair-installation": elMonteSprinklerRepairInstallation,
    "glendora-sprinkler-repair-installation": glendoraSprinklerRepairInstallation,
    "la-verne-sprinkler-repair-installation": laVerneSprinklerRepairInstallation,
    "monrovia-sprinkler-repair-installation": monroviaSprinklerRepairInstallation,
    "pasadena-sprinkler-repair-installation": pasadenaSprinklerRepairInstallation,
    "pomona-sprinkler-repair-installation": pomonaSprinklerRepairInstallation,
    "rowland-heights-sprinkler-repair-installation": rowlandHeightsSprinklerRepairInstallation,
    "san-dimas-sprinkler-repair-installation": sanDimasSprinklerRepairInstallation,
    "san-gabriel-sprinkler-repair-installation": sanGabrielSprinklerRepairInstallation,
    "temple-city-sprinkler-repair-installation": templeCitySprinklerRepairInstallation,
    "walnut-sprinkler-repair-installation": walnutSprinklerRepairInstallation,
    "west-covina-sprinkler-repair-installation": westCovinaSprinklerRepairInstallation,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};