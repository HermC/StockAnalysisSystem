package web.dao.UserSystem;

import web.pojo.after.SocialgroupPo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/17.
 */
public interface SocialGroupMapper {
    /**
     * 创建社群
     * @param sgname
     * @param userids
     * @return
     */
    public String createsocialgroup(String sgname , ArrayList<String> userids);

    /**
     * 获取社群
     * @param sgid
     * @return
     */
    public SocialgroupPo getsocialgroup(String sgid);
}
