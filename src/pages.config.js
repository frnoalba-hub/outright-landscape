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
import IrrigationService from './pages/IrrigationService';
import Robots from './pages/Robots';
import SEOAudit from './pages/SEOAudit';
import ServiceArea from './pages/ServiceArea';
import arcadiaDripIrrigation from './pages/arcadia-drip-irrigation';
import arcadiaIrrigationRepair from './pages/arcadia-irrigation-repair';
import arcadiaLandscaping from './pages/arcadia-landscaping';
import arcadiaSprinklerRepair from './pages/arcadia-sprinkler-repair';
import arcadiaSprinklerValves from './pages/arcadia-sprinkler-valves';
import azusaDripIrrigation from './pages/azusa-drip-irrigation';
import azusaIrrigationRepair from './pages/azusa-irrigation-repair';
import azusaLandscaping from './pages/azusa-landscaping';
import azusaSprinklerRepair from './pages/azusa-sprinkler-repair';
import azusaSprinklerValves from './pages/azusa-sprinkler-valves';
import baldwinParkDripIrrigation from './pages/baldwin-park-drip-irrigation';
import baldwinParkIrrigationRepair from './pages/baldwin-park-irrigation-repair';
import baldwinParkLandscaping from './pages/baldwin-park-landscaping';
import baldwinParkSprinklerRepair from './pages/baldwin-park-sprinkler-repair';
import baldwinParkSprinklerValves from './pages/baldwin-park-sprinkler-valves';
import charterOakDripIrrigation from './pages/charter-oak-drip-irrigation';
import charterOakIrrigationRepair from './pages/charter-oak-irrigation-repair';
import charterOakLandscaping from './pages/charter-oak-landscaping';
import charterOakSprinklerRepair from './pages/charter-oak-sprinkler-repair';
import charterOakSprinklerValves from './pages/charter-oak-sprinkler-valves';
import claremontDripIrrigation from './pages/claremont-drip-irrigation';
import claremontIrrigationRepair from './pages/claremont-irrigation-repair';
import claremontLandscaping from './pages/claremont-landscaping';
import claremontSprinklerRepair from './pages/claremont-sprinkler-repair';
import claremontSprinklerValves from './pages/claremont-sprinkler-valves';
import covinaDripIrrigation from './pages/covina-drip-irrigation';
import covinaIrrigationRepair from './pages/covina-irrigation-repair';
import covinaLandscape from './pages/covina-landscape';
import covinaLandscaping from './pages/covina-landscaping';
import covinaSprinklerRepair from './pages/covina-sprinkler-repair';
import covinaSprinklerValves from './pages/covina-sprinkler-valves';
import diamondBarDripIrrigation from './pages/diamond-bar-drip-irrigation';
import diamondBarIrrigationRepair from './pages/diamond-bar-irrigation-repair';
import diamondBarLandscaping from './pages/diamond-bar-landscaping';
import diamondBarSprinklerRepair from './pages/diamond-bar-sprinkler-repair';
import diamondBarSprinklerValves from './pages/diamond-bar-sprinkler-valves';
import duarteDripIrrigation from './pages/duarte-drip-irrigation';
import duarteIrrigationRepair from './pages/duarte-irrigation-repair';
import duarteLandscaping from './pages/duarte-landscaping';
import duarteSprinklerRepair from './pages/duarte-sprinkler-repair';
import duarteSprinklerValves from './pages/duarte-sprinkler-valves';
import elMonteDripIrrigation from './pages/el-monte-drip-irrigation';
import elMonteIrrigationRepair from './pages/el-monte-irrigation-repair';
import elMonteLandscaping from './pages/el-monte-landscaping';
import elMonteSprinklerRepair from './pages/el-monte-sprinkler-repair';
import elMonteSprinklerValves from './pages/el-monte-sprinkler-valves';
import glendoraDripIrrigation from './pages/glendora-drip-irrigation';
import glendoraIrrigationRepair from './pages/glendora-irrigation-repair';
import glendoraLandscaping from './pages/glendora-landscaping';
import glendoraSprinklerRepair from './pages/glendora-sprinkler-repair';
import glendoraSprinklerValves from './pages/glendora-sprinkler-valves';
import laVerneDripIrrigation from './pages/la-verne-drip-irrigation';
import laVerneIrrigationRepair from './pages/la-verne-irrigation-repair';
import laVerneLandscaping from './pages/la-verne-landscaping';
import laVerneSprinklerRepair from './pages/la-verne-sprinkler-repair';
import laVerneSprinklerValves from './pages/la-verne-sprinkler-valves';
import monroviaDripIrrigation from './pages/monrovia-drip-irrigation';
import monroviaIrrigationRepair from './pages/monrovia-irrigation-repair';
import monroviaLandscaping from './pages/monrovia-landscaping';
import monroviaSprinklerRepair from './pages/monrovia-sprinkler-repair';
import monroviaSprinklerValves from './pages/monrovia-sprinkler-valves';
import pasadenaDripIrrigation from './pages/pasadena-drip-irrigation';
import pasadenaIrrigationRepair from './pages/pasadena-irrigation-repair';
import pasadenaLandscaping from './pages/pasadena-landscaping';
import pasadenaSprinklerRepair from './pages/pasadena-sprinkler-repair';
import pasadenaSprinklerValves from './pages/pasadena-sprinkler-valves';
import pomonaDripIrrigation from './pages/pomona-drip-irrigation';
import pomonaIrrigationRepair from './pages/pomona-irrigation-repair';
import pomonaLandscaping from './pages/pomona-landscaping';
import pomonaSprinklerRepair from './pages/pomona-sprinkler-repair';
import pomonaSprinklerValves from './pages/pomona-sprinkler-valves';
import rowlandHeightsDripIrrigation from './pages/rowland-heights-drip-irrigation';
import rowlandHeightsIrrigationRepair from './pages/rowland-heights-irrigation-repair';
import rowlandHeightsLandscaping from './pages/rowland-heights-landscaping';
import rowlandHeightsSprinklerRepair from './pages/rowland-heights-sprinkler-repair';
import rowlandHeightsSprinklerValves from './pages/rowland-heights-sprinkler-valves';
import sanDimasDripIrrigation from './pages/san-dimas-drip-irrigation';
import sanDimasIrrigationRepair from './pages/san-dimas-irrigation-repair';
import sanDimasLandscaping from './pages/san-dimas-landscaping';
import sanDimasSprinklerRepair from './pages/san-dimas-sprinkler-repair';
import sanDimasSprinklerValves from './pages/san-dimas-sprinkler-valves';
import sanGabrielDripIrrigation from './pages/san-gabriel-drip-irrigation';
import sanGabrielIrrigationRepair from './pages/san-gabriel-irrigation-repair';
import sanGabrielLandscaping from './pages/san-gabriel-landscaping';
import sanGabrielSprinklerRepair from './pages/san-gabriel-sprinkler-repair';
import sanGabrielSprinklerValves from './pages/san-gabriel-sprinkler-valves';
import templeCityDripIrrigation from './pages/temple-city-drip-irrigation';
import templeCityIrrigationRepair from './pages/temple-city-irrigation-repair';
import templeCityLandscaping from './pages/temple-city-landscaping';
import templeCitySprinklerRepair from './pages/temple-city-sprinkler-repair';
import templeCitySprinklerValves from './pages/temple-city-sprinkler-valves';
import walnutDripIrrigation from './pages/walnut-drip-irrigation';
import walnutIrrigationRepair from './pages/walnut-irrigation-repair';
import walnutLandscaping from './pages/walnut-landscaping';
import walnutSprinklerRepair from './pages/walnut-sprinkler-repair';
import walnutSprinklerValves from './pages/walnut-sprinkler-valves';
import westCovinaDripIrrigation from './pages/west-covina-drip-irrigation';
import westCovinaIrrigationRepair from './pages/west-covina-irrigation-repair';
import westCovinaLandscaping from './pages/west-covina-landscaping';
import westCovinaSprinklerRepair from './pages/west-covina-sprinkler-repair';
import westCovinaSprinklerValves from './pages/west-covina-sprinkler-valves';
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
    "IrrigationService": IrrigationService,
    "Robots": Robots,
    "SEOAudit": SEOAudit,
    "ServiceArea": ServiceArea,
    "arcadia-drip-irrigation": arcadiaDripIrrigation,
    "arcadia-irrigation-repair": arcadiaIrrigationRepair,
    "arcadia-landscaping": arcadiaLandscaping,
    "arcadia-sprinkler-repair": arcadiaSprinklerRepair,
    "arcadia-sprinkler-valves": arcadiaSprinklerValves,
    "azusa-drip-irrigation": azusaDripIrrigation,
    "azusa-irrigation-repair": azusaIrrigationRepair,
    "azusa-landscaping": azusaLandscaping,
    "azusa-sprinkler-repair": azusaSprinklerRepair,
    "azusa-sprinkler-valves": azusaSprinklerValves,
    "baldwin-park-drip-irrigation": baldwinParkDripIrrigation,
    "baldwin-park-irrigation-repair": baldwinParkIrrigationRepair,
    "baldwin-park-landscaping": baldwinParkLandscaping,
    "baldwin-park-sprinkler-repair": baldwinParkSprinklerRepair,
    "baldwin-park-sprinkler-valves": baldwinParkSprinklerValves,
    "charter-oak-drip-irrigation": charterOakDripIrrigation,
    "charter-oak-irrigation-repair": charterOakIrrigationRepair,
    "charter-oak-landscaping": charterOakLandscaping,
    "charter-oak-sprinkler-repair": charterOakSprinklerRepair,
    "charter-oak-sprinkler-valves": charterOakSprinklerValves,
    "claremont-drip-irrigation": claremontDripIrrigation,
    "claremont-irrigation-repair": claremontIrrigationRepair,
    "claremont-landscaping": claremontLandscaping,
    "claremont-sprinkler-repair": claremontSprinklerRepair,
    "claremont-sprinkler-valves": claremontSprinklerValves,
    "covina-drip-irrigation": covinaDripIrrigation,
    "covina-irrigation-repair": covinaIrrigationRepair,
    "covina-landscape": covinaLandscape,
    "covina-landscaping": covinaLandscaping,
    "covina-sprinkler-repair": covinaSprinklerRepair,
    "covina-sprinkler-valves": covinaSprinklerValves,
    "diamond-bar-drip-irrigation": diamondBarDripIrrigation,
    "diamond-bar-irrigation-repair": diamondBarIrrigationRepair,
    "diamond-bar-landscaping": diamondBarLandscaping,
    "diamond-bar-sprinkler-repair": diamondBarSprinklerRepair,
    "diamond-bar-sprinkler-valves": diamondBarSprinklerValves,
    "duarte-drip-irrigation": duarteDripIrrigation,
    "duarte-irrigation-repair": duarteIrrigationRepair,
    "duarte-landscaping": duarteLandscaping,
    "duarte-sprinkler-repair": duarteSprinklerRepair,
    "duarte-sprinkler-valves": duarteSprinklerValves,
    "el-monte-drip-irrigation": elMonteDripIrrigation,
    "el-monte-irrigation-repair": elMonteIrrigationRepair,
    "el-monte-landscaping": elMonteLandscaping,
    "el-monte-sprinkler-repair": elMonteSprinklerRepair,
    "el-monte-sprinkler-valves": elMonteSprinklerValves,
    "glendora-drip-irrigation": glendoraDripIrrigation,
    "glendora-irrigation-repair": glendoraIrrigationRepair,
    "glendora-landscaping": glendoraLandscaping,
    "glendora-sprinkler-repair": glendoraSprinklerRepair,
    "glendora-sprinkler-valves": glendoraSprinklerValves,
    "la-verne-drip-irrigation": laVerneDripIrrigation,
    "la-verne-irrigation-repair": laVerneIrrigationRepair,
    "la-verne-landscaping": laVerneLandscaping,
    "la-verne-sprinkler-repair": laVerneSprinklerRepair,
    "la-verne-sprinkler-valves": laVerneSprinklerValves,
    "monrovia-drip-irrigation": monroviaDripIrrigation,
    "monrovia-irrigation-repair": monroviaIrrigationRepair,
    "monrovia-landscaping": monroviaLandscaping,
    "monrovia-sprinkler-repair": monroviaSprinklerRepair,
    "monrovia-sprinkler-valves": monroviaSprinklerValves,
    "pasadena-drip-irrigation": pasadenaDripIrrigation,
    "pasadena-irrigation-repair": pasadenaIrrigationRepair,
    "pasadena-landscaping": pasadenaLandscaping,
    "pasadena-sprinkler-repair": pasadenaSprinklerRepair,
    "pasadena-sprinkler-valves": pasadenaSprinklerValves,
    "pomona-drip-irrigation": pomonaDripIrrigation,
    "pomona-irrigation-repair": pomonaIrrigationRepair,
    "pomona-landscaping": pomonaLandscaping,
    "pomona-sprinkler-repair": pomonaSprinklerRepair,
    "pomona-sprinkler-valves": pomonaSprinklerValves,
    "rowland-heights-drip-irrigation": rowlandHeightsDripIrrigation,
    "rowland-heights-irrigation-repair": rowlandHeightsIrrigationRepair,
    "rowland-heights-landscaping": rowlandHeightsLandscaping,
    "rowland-heights-sprinkler-repair": rowlandHeightsSprinklerRepair,
    "rowland-heights-sprinkler-valves": rowlandHeightsSprinklerValves,
    "san-dimas-drip-irrigation": sanDimasDripIrrigation,
    "san-dimas-irrigation-repair": sanDimasIrrigationRepair,
    "san-dimas-landscaping": sanDimasLandscaping,
    "san-dimas-sprinkler-repair": sanDimasSprinklerRepair,
    "san-dimas-sprinkler-valves": sanDimasSprinklerValves,
    "san-gabriel-drip-irrigation": sanGabrielDripIrrigation,
    "san-gabriel-irrigation-repair": sanGabrielIrrigationRepair,
    "san-gabriel-landscaping": sanGabrielLandscaping,
    "san-gabriel-sprinkler-repair": sanGabrielSprinklerRepair,
    "san-gabriel-sprinkler-valves": sanGabrielSprinklerValves,
    "temple-city-drip-irrigation": templeCityDripIrrigation,
    "temple-city-irrigation-repair": templeCityIrrigationRepair,
    "temple-city-landscaping": templeCityLandscaping,
    "temple-city-sprinkler-repair": templeCitySprinklerRepair,
    "temple-city-sprinkler-valves": templeCitySprinklerValves,
    "walnut-drip-irrigation": walnutDripIrrigation,
    "walnut-irrigation-repair": walnutIrrigationRepair,
    "walnut-landscaping": walnutLandscaping,
    "walnut-sprinkler-repair": walnutSprinklerRepair,
    "walnut-sprinkler-valves": walnutSprinklerValves,
    "west-covina-drip-irrigation": westCovinaDripIrrigation,
    "west-covina-irrigation-repair": westCovinaIrrigationRepair,
    "west-covina-landscaping": westCovinaLandscaping,
    "west-covina-sprinkler-repair": westCovinaSprinklerRepair,
    "west-covina-sprinkler-valves": westCovinaSprinklerValves,
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