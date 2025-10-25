// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import colors from 'vuetify/util/colors'

// Vuetify
import { createVuetify } from 'vuetify'
import { h } from "vue";
import { mdi } from "vuetify/iconsets/mdi";
// import and register custom icon components 
import ErstgespraechIcon from "@/components/icons/ErstgespraechIcon.vue";
import IndividuellePreiseIcon from "@/components/icons/IndividuellePreiseIcon.vue";
import JederMannIcon from "@/components/icons/JederMannIcon.vue";
import GeschaeftigerIcon from "@/components/icons/GeschaeftigerIcon.vue";
import RenterIcon from "@/components/icons/RenterIcon.vue";
import StudierendeIcon from "@/components/icons/StudierendeIcon.vue";
import CoffeeWalkIcon from "@/components/icons/CoffeeWalkIcon.vue";
import AfterWorkIcon from "@/components/icons/AfterWorkIcon.vue";
import StigmatisierungIcon from "@/components/icons/StigmatisierungIcon.vue";
import KommunikationIcon from "@/components/icons/KommunikationIcon.vue";
import GestaltungIcon from "@/components/icons/GestaltungIcon.vue";
import GesundheitIcon from "@/components/icons/GesundheitIcon.vue";
import SelbststeuerungIcon from "@/components/icons/SelbststeuerungIcon.vue";
import SchutzraumIcon from "@/components/icons/SchutzraumIcon.vue";
import WalkAndTalkIcon from "@/components/icons/WalkAndTalkIcon.vue";
import ErweiterungsmoglichkeitenIcon from "@/components/icons/ErweiterungsmoglichkeitenIcon.vue";
import EinzelbegleitungIcon from "@/components/icons/EinzelbegleitungIcon.vue";

const customIcons = {
  erstgespraech: ErstgespraechIcon,
  individuellepreise: IndividuellePreiseIcon,
  jedermann: JederMannIcon,
  geschaeftiger: GeschaeftigerIcon,
  renter: RenterIcon,
  studierende: StudierendeIcon,
  coffeewalk: CoffeeWalkIcon,
  afterwork: AfterWorkIcon,
  stigmatisierung: StigmatisierungIcon,
  kommunikation: KommunikationIcon,
  gestaltung: GestaltungIcon,
  gesundheit: GesundheitIcon,
  selbststeuerung: SelbststeuerungIcon,
  schutzraum: SchutzraumIcon,
  walkandtalk: WalkAndTalkIcon,
  einzelbegleitung: EinzelbegleitungIcon,
  erweiterungsmoglichkeiten: ErweiterungsmoglichkeitenIcon,
}

const customIconSet = {
  component: (props) =>
    h(props.tag, [h(customIcons[props.icon], { class: 'v-icon__svg' })]),
}


export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    style: {
      configFile: './src/styles/settings.scss',
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#035b44', // forest green
            accent: '#59ab96', // light minthsl(29, 56.10%, 59.80%)

            // page background 
            background: '#010300', //#010f00  
            surface: '#242428', // dark wood brown #050505

            // text colors
            'on-surface' : "rgb(251, 243, 225)", // bright beige
            'card-title-text' : "#95cbbe", // forest green#95cbbe

            // signal colors 
            error: '#D32F2F', // red for errors
            info: '#1976D2', // blue for info
            success: '#388E3C', // green for success
            warning: '#FFA000', // amber for warnings

            // navbar colors
            the_navbar_active_text_color: '#59ab96', // muted brown
            the_navbar_inactive_text_color: '#035b44', // slightly darker muted brown
            the_navbar_slider_color: '#59ab96', // forest green #59ab96


            // buttons
            brand_button: '#211814', // muted brown
            // brand_icon: '#af8474', // muted brown deprecated

            cta_button: '#035b44', // forest green #59ab96
            cta_button_text: '#ecfaed', // brighter shade

            mobile_cta_fab_color: '#59ab96', // red for errors

            
            back_to_top_button_color: '#59ab96', // forest green
            send_contact_button: '#2cf105', // forest green
            reset_button: '#FFA000', // yellow orange


            // card specific colors 
            faq_expansion_panel_border_color: '#59ab96', // forest green #59ab96
            faq_expansion_panel_title_color: '#59ab96', // forest green #59ab96
            faq_expansion_panel_icon_color: '#59ab96', 
            faq_expansion_panel_show_all_button_color: '#59ab96', 
          },
        },
        //#87ed87
        light: {
          colors: {
            
            // primary: '#035b44', // forest green
            // accent: '#59ab96', // light mint

            // page background 
            background: '#FFFFFF', // white
            surface: '#e4f5eb', //#e4f5eb light green

            // text colors
            'on-surface' : "#031515", // light forest green #031515
            'card-title-text' : "#247778", // forest green#95cbbe

            // signal colors 
            // error: '#D32F2F', // red for errors
            // info: '#1976D2', // blue for info
            // success: '#388E3C', // green for success
            // warning: '#FFA000', // amber for warnings

            // navbar colors
            the_navbar_active_text_color: '#247778', // muted brown
            the_navbar_inactive_text_color: '#376b6c', //#376b6c slightly darker muted brown
            the_navbar_slider_color: '#247778', // forest green #59ab96


            // buttons
            brand_button: '#CFEFDc', // muted brown
            // brand_icon: '#af8474', // muted brown deprecated

            cta_button: '#247778', // forest green #59ab96
            cta_button_text: '#ecfaed', // brighter shade

            mobile_cta_fab_color: '#247778', // forest green #247778

            
            back_to_top_button_color: '#247778', // forest green
            send_contact_button: '#2cf105', // forest green
            reset_button: '#FFA000', // yellow orange


            // card specific colors 
            faq_expansion_panel_border_color: '#247778', // forest green #59ab96
            faq_expansion_panel_title_color: '#135f60', // light forest green #135f60
            faq_expansion_panel_icon_color: '#247778', 
            faq_expansion_panel_show_all_button_color: '#247778', 

            primary: '#035b44', // forest green
            accent: '#247778', // forest green#247778

          },
          variables: {
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',
      sets : {
        mdi,
        custom: customIconSet,
      },
    },
  }
)
