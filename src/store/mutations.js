/*直接修改state状态*/
import {
  REVEIVE_CATEGROUP
} from './mutations-type'
export default {
  [REVEIVE_CATEGROUP](state,{teams}){
    state.teams = teams;
  }
}
