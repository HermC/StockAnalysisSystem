package web.impl.UserSystemBL;

import org.springframework.stereotype.Service;
import web.dao.UserSystem.SocialGroupMapper;
import web.pojo.after.SocialgroupPo;
import web.pojo.after.UserPo;
import web.pojo.enumPo.DeleteState;
import web.service.UserSystemBL.SocialGroupService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linyufan on 16/8/17.
 */
@Service("socialGroupService")
public class SocialGroupImpl implements SocialGroupService {

    @Resource
    public SocialGroupMapper socialGroupMapper;

    @Override
    public String createsocialgroup(String sgname, ArrayList<String> userids) {
        socialGroupMapper.createsocialgroup(sgname);
        String groupid = socialGroupMapper.getsocialgroupid(sgname);
//        ArrayList<Map> users = new ArrayList<>();
        for (int i=0;i<userids.size();i++) {
            socialGroupMapper.adduserintogroup(groupid, userids.get(i));
        }

        return groupid;
    }

    @Override
    public SocialgroupPo getsocialgroup(String sgid) {

        return null;
    }

    @Override
    public ArrayList<SocialgroupPo> getAllsocialgroup() {
        ArrayList<SocialgroupPo> socialgroupPos = socialGroupMapper.getAllsocialgroup();
        for (int i=0;i<socialgroupPos.size();i++){
            ArrayList<UserPo> result = socialGroupMapper.getAllUserInGroup(socialgroupPos.get(i).getSgid());
            ArrayList<UserPo> temp = socialGroupMapper.getAllUserid(socialgroupPos.get(i).getSgid());
            for (int j=0;j<temp.size();j++){
                String tempid = temp.get(j).getUserId();
                int bool = 0;
                for (int k=0;k<result.size();k++){
                    if (tempid.equals(result.get(k).getUserId())) {
                        bool = 1;
                        break;
                    }
                }
                if (bool==0) {
                    UserPo tempuser = new UserPo(tempid, temp.get(i).getUserName(), 0, "该用户还未创建策略", "该用户还未创建策略", "该用户还未创建策略");
                    result.add(tempuser);
                }
            }
            double maxearn_average = 0;
            for (int k=0;k<result.size();k++){
                maxearn_average += result.get(i).getMaxearn();
            }
            double de = result.size();
            maxearn_average = maxearn_average / de;
            socialgroupPos.get(i).setMaxearn_average(maxearn_average);
            socialgroupPos.get(i).setMembers(result);
        }
        return socialgroupPos;
    }
}
