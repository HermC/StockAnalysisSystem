package web.service.UserSystemBL;

import web.pojo.after.SocialgroupPo;
import web.pojo.enumPo.DeleteState;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/17.
 */
public interface SocialGroupService {

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

    /**
     * 获取社群
     * @return
     */
    public ArrayList<SocialgroupPo> getAllsocialgroup();



}
