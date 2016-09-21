package web.dao.UserSystem;

import org.springframework.stereotype.Repository;
import web.pojo.after.SocialgroupPo;
import web.pojo.after.UserPo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/17.
 */

@Repository
public interface SocialGroupMapper {
    /**
     * 创建社群
     * @param sgname
     * @return
     */
    public void createsocialgroup(String sgname );

    public String getsocialgroupid(String sgname);

    public void adduserintogroup(String groupid ,String users);

    /**
     * 获取社群
     * @param sgid
     * @return
     */
    public SocialgroupPo getsocialgroup(String sgid);

    /**
     * 获取社群
     * @return
     */
    public ArrayList<SocialgroupPo> getAllsocialgroup();

    public ArrayList<UserPo> getAllUserInGroup(String groupid);

    public ArrayList<UserPo> getAllUserid(String groupid);

}
