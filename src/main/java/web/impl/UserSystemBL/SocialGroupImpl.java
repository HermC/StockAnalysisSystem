package web.impl.UserSystemBL;

import org.springframework.stereotype.Service;
import web.pojo.after.SocialgroupPo;
import web.pojo.enumPo.DeleteState;
import web.service.UserSystemBL.SocialGroupService;

/**
 * Created by linyufan on 16/8/17.
 */
@Service("socialGroupService")
public class SocialGroupImpl implements SocialGroupService {


    @Override
    public String createSocialGroup(SocialgroupPo socialgroupPo) {
        return null;
    }

    @Override
    public DeleteState deleteSocialGroup(String sgid) {
        return null;
    }
}
