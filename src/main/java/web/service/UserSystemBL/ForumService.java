package web.service.UserSystemBL;

import web.pojo.after.TopicPo;
import web.pojo.enumPo.AddState;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/11.
 */
public interface ForumService {

    /**
     * 发表帖子
     * @param userid
     * @param title
     * @param content
     * @return
     */
    public String addtopic(String userid,String title,String content,String strategyid);

    /**
     * 回复原帖
     * @param userid
     * @param topicid
     * @param content
     * @return
     */
    public AddState replytopic(String userid, String topicid, String content);

    /**
     * 回复跟贴
     * @param userid
     * @param replyid
     * @param content
     * @return
     */
    public AddState replyreply(String userid,String topicid,String replyid ,String content);

    /**
     * 获得单独帖子的详细信息(包括replypo)
     * @param tid
     * @return
     */
    public TopicPo getTopic(String tid );

    /**
     * 返回数据库中所有帖子的简略信息(不包括replypo)
     * @return
     */
    public ArrayList<TopicPo> getAllTopic();

    /**
     * 增加回复数
     * @param tid
     */
    public void updatereplycount(String tid);

    /**
     * 增加点击量
     * @param tid
     */
    public void updateclickcount(String tid);

    /**
     * 模糊搜索
     * @param title
     * @return
     */
    public ArrayList<TopicPo> getSearch(String title);


}
