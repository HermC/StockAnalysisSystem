package web.service.UserSystemBL;

import web.pojo.after.SocialgroupPo;
import web.pojo.enumPo.DeleteState;

/**
 * Created by linyufan on 16/8/17.
 */
public interface SocialGroupService {

    /**
     * 创建社区
     * @param socialgroupPo
     * @return
     */
    public String createSocialGroup(SocialgroupPo socialgroupPo);

    /**
     * 删除一个社群
     * //todo 记得处理一下用户和社群的关系
     * @param sgid
     * @return
     */
    public DeleteState deleteSocialGroup(String sgid);




}
