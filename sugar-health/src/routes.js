import EnterData from './components/EnterData.vue'
import Login from './components/Login.vue'
import AboutUs from './components/AboutUs.vue'
import Settings from './components/UserSettings'
import SugarHistory from './components/SugarHistory/SugarHistory.vue'
import ChallengesAll from './components/ChallengesAll.vue'
import GoPremium from './components/GoPremium.vue'

const routes = [
    {path : '/sugarIntake', component : EnterData},
    {path : '/', component : Login},
    {path : '/aboutus', component : AboutUs},
    {path : '/settings', component : Settings},
    {path : '/sugarhistory', component : SugarHistory},
    {path : '/challenges', component : ChallengesAll},
    {path : '/gopremium', component : GoPremium}
] 

export default routes

 