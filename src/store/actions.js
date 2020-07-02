import {reqTeams} from '../api/index'
import {
  REVEIVE_CATEGROUP
} from './mutations-type'
export default{

  //异步获取团队信息
  async getTeams({commit}){
    const result = await reqTeams();
    console.log(result);
    commit(REVEIVE_CATEGROUP,{teams:result.obj})
  }
}
