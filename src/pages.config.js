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
import Blog from './pages/Blog';
import Hardscape from './pages/Hardscape';
import Home from './pages/Home';
import Irrigation from './pages/Irrigation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import arcadiaHardscape from './pages/arcadia-hardscape';
import arcadiaLandscaping from './pages/arcadia-landscaping';
import arcadiaSprinklerRepairInstallation from './pages/arcadia-sprinkler-repair-installation';
import azusaHardscape from './pages/azusa-hardscape';
import azusaLandscaping from './pages/azusa-landscaping';
import azusaSprinklerRepairInstallation from './pages/azusa-sprinkler-repair-installation';
import baldwinParkHardscape from './pages/baldwin-park-hardscape';
import baldwinParkLandscaping from './pages/baldwin-park-landscaping';
import baldwinParkSprinklerRepairInstallation from './pages/baldwin-park-sprinkler-repair-installation';
import charterOakHardscape from './pages/charter-oak-hardscape';
import charterOakLandscaping from './pages/charter-oak-landscaping';
import charterOakSprinklerRepairInstallation from './pages/charter-oak-sprinkler-repair-installation';
import claremontHardscape from './pages/claremont-hardscape';
import claremontLandscaping from './pages/claremont-landscaping';
import claremontSprinklerRepairInstallation from './pages/claremont-sprinkler-repair-installation';
import covinaHardscape from './pages/covina-hardscape';
import covinaLandscaping from './pages/covina-landscaping';
import covinaSprinklerRepairInstallation from './pages/covina-sprinkler-repair-installation';
import diamondBarHardscape from './pages/diamond-bar-hardscape';
import diamondBarLandscaping from './pages/diamond-bar-landscaping';
import diamondBarSprinklerRepairInstallation from './pages/diamond-bar-sprinkler-repair-installation';
import duarteHardscape from './pages/duarte-hardscape';
import duarteLandscaping from './pages/duarte-landscaping';
import duarteSprinklerRepairInstallation from './pages/duarte-sprinkler-repair-installation';
import elMonteHardscape from './pages/el-monte-hardscape';
import elMonteLandscaping from './pages/el-monte-landscaping';
import elMonteSprinklerRepairInstallation from './pages/el-monte-sprinkler-repair-installation';
import glendoraHardscape from './pages/glendora-hardscape';
import glendoraLandscaping from './pages/glendora-landscaping';
import glendoraSprinklerRepairInstallation from './pages/glendora-sprinkler-repair-installation';
import laVerneHardscape from './pages/la-verne-hardscape';
import laVerneLandscaping from './pages/la-verne-landscaping';
import laVerneSprinklerRepairInstallation from './pages/la-verne-sprinkler-repair-installation';
import monroviaHardscape from './pages/monrovia-hardscape';
import monroviaLandscaping from './pages/monrovia-landscaping';
import monroviaSprinklerRepairInstallation from './pages/monrovia-sprinkler-repair-installation';
import pasadenaHardscape from './pages/pasadena-hardscape';
import pasadenaLandscaping from './pages/pasadena-landscaping';
import pasadenaSprinklerRepairInstallation from './pages/pasadena-sprinkler-repair-installation';
import pomonaHardscape from './pages/pomona-hardscape';
import pomonaLandscaping from './pages/pomona-landscaping';
import pomonaSprinklerRepairInstallation from './pages/pomona-sprinkler-repair-installation';
import rowlandHeightsHardscape from './pages/rowland-heights-hardscape';
import rowlandHeightsLandscaping from './pages/rowland-heights-landscaping';
import rowlandHeightsSprinklerRepairInstallation from './pages/rowland-heights-sprinkler-repair-installation';
import sanDimasHardscape from './pages/san-dimas-hardscape';
import sanDimasLandscaping from './pages/san-dimas-landscaping';
import sanDimasSprinklerRepairInstallation from './pages/san-dimas-sprinkler-repair-installation';
import sanGabrielHardscape from './pages/san-gabriel-hardscape';
import sanGabrielLandscaping from './pages/san-gabriel-landscaping';
import sanGabrielSprinklerRepairInstallation from './pages/san-gabriel-sprinkler-repair-installation';
import templeCityHardscape from './pages/temple-city-hardscape';
import templeCityLandscaping from './pages/temple-city-landscaping';
import templeCitySprinklerRepairInstallation from './pages/temple-city-sprinkler-repair-installation';
import walnutHardscape from './pages/walnut-hardscape';
import walnutLandscaping from './pages/walnut-landscaping';
import walnutSprinklerRepairInstallation from './pages/walnut-sprinkler-repair-installation';
import westCovinaHardscape from './pages/west-covina-hardscape';
import westCovinaLandscaping from './pages/west-covina-landscaping';
import westCovinaSprinklerRepairInstallation from './pages/west-covina-sprinkler-repair-installation';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Blog": Blog,
    "Hardscape": Hardscape,
    "Home": Home,
    "Irrigation": Irrigation,
    "PrivacyPolicy": PrivacyPolicy,
    "arcadia-hardscape": arcadiaHardscape,
    "arcadia-landscaping": arcadiaLandscaping,
    "arcadia-sprinkler-repair-installation": arcadiaSprinklerRepairInstallation,
    "azusa-hardscape": azusaHardscape,
    "azusa-landscaping": azusaLandscaping,
    "azusa-sprinkler-repair-installation": azusaSprinklerRepairInstallation,
    "baldwin-park-hardscape": baldwinParkHardscape,
    "baldwin-park-landscaping": baldwinParkLandscaping,
    "baldwin-park-sprinkler-repair-installation": baldwinParkSprinklerRepairInstallation,
    "charter-oak-hardscape": charterOakHardscape,
    "charter-oak-landscaping": charterOakLandscaping,
    "charter-oak-sprinkler-repair-installation": charterOakSprinklerRepairInstallation,
    "claremont-hardscape": claremontHardscape,
    "claremont-landscaping": claremontLandscaping,
    "claremont-sprinkler-repair-installation": claremontSprinklerRepairInstallation,
    "covina-hardscape": covinaHardscape,
    "covina-landscaping": covinaLandscaping,
    "covina-sprinkler-repair-installation": covinaSprinklerRepairInstallation,
    "diamond-bar-hardscape": diamondBarHardscape,
    "diamond-bar-landscaping": diamondBarLandscaping,
    "diamond-bar-sprinkler-repair-installation": diamondBarSprinklerRepairInstallation,
    "duarte-hardscape": duarteHardscape,
    "duarte-landscaping": duarteLandscaping,
    "duarte-sprinkler-repair-installation": duarteSprinklerRepairInstallation,
    "el-monte-hardscape": elMonteHardscape,
    "el-monte-landscaping": elMonteLandscaping,
    "el-monte-sprinkler-repair-installation": elMonteSprinklerRepairInstallation,
    "glendora-hardscape": glendoraHardscape,
    "glendora-landscaping": glendoraLandscaping,
    "glendora-sprinkler-repair-installation": glendoraSprinklerRepairInstallation,
    "la-verne-hardscape": laVerneHardscape,
    "la-verne-landscaping": laVerneLandscaping,
    "la-verne-sprinkler-repair-installation": laVerneSprinklerRepairInstallation,
    "monrovia-hardscape": monroviaHardscape,
    "monrovia-landscaping": monroviaLandscaping,
    "monrovia-sprinkler-repair-installation": monroviaSprinklerRepairInstallation,
    "pasadena-hardscape": pasadenaHardscape,
    "pasadena-landscaping": pasadenaLandscaping,
    "pasadena-sprinkler-repair-installation": pasadenaSprinklerRepairInstallation,
    "pomona-hardscape": pomonaHardscape,
    "pomona-landscaping": pomonaLandscaping,
    "pomona-sprinkler-repair-installation": pomonaSprinklerRepairInstallation,
    "rowland-heights-hardscape": rowlandHeightsHardscape,
    "rowland-heights-landscaping": rowlandHeightsLandscaping,
    "rowland-heights-sprinkler-repair-installation": rowlandHeightsSprinklerRepairInstallation,
    "san-dimas-hardscape": sanDimasHardscape,
    "san-dimas-landscaping": sanDimasLandscaping,
    "san-dimas-sprinkler-repair-installation": sanDimasSprinklerRepairInstallation,
    "san-gabriel-hardscape": sanGabrielHardscape,
    "san-gabriel-landscaping": sanGabrielLandscaping,
    "san-gabriel-sprinkler-repair-installation": sanGabrielSprinklerRepairInstallation,
    "temple-city-hardscape": templeCityHardscape,
    "temple-city-landscaping": templeCityLandscaping,
    "temple-city-sprinkler-repair-installation": templeCitySprinklerRepairInstallation,
    "walnut-hardscape": walnutHardscape,
    "walnut-landscaping": walnutLandscaping,
    "walnut-sprinkler-repair-installation": walnutSprinklerRepairInstallation,
    "west-covina-hardscape": westCovinaHardscape,
    "west-covina-landscaping": westCovinaLandscaping,
    "west-covina-sprinkler-repair-installation": westCovinaSprinklerRepairInstallation,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
