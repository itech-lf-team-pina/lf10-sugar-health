import EnterData from '@/pages/EnterData.vue'
import Login from '@/pages/Login.vue'
import AboutUs from '@/pages/AboutUs.vue'
import Settings from '@/pages/UserSettings'
import SugarHistory from '@/pages/SugarHistory.vue'
import GoPremium from '@/pages/GoPremium.vue'
import ProfileChooser from '@/pages/ProfileChooser.vue'
import Profile from "@/pages/Profile.vue";

const routes = [
    {path : '/sugarIntake', component : EnterData},
    {path : '/', component : Login},
    {path : '/aboutus', component : AboutUs},
    {path : '/settings', component : Settings},
    {path : '/sugarhistory', component : SugarHistory},
    {path : '/profiles', component : Profile},
    {path : '/gopremium', component : GoPremium},
    {path : '/choose-profile', component : ProfileChooser}
] 

export default routes

 