package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.UserSystem.ForumMapper;
import web.pojo.after.ReplyPo;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/12.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class ForumMapperTest {
    @Resource
    ForumMapper forumMapper;

    @Test
    public void test(){
        ArrayList<ReplyPo> replyPos = forumMapper.getTopicReply("1");
        System.out.println(replyPos.size());
        for (ReplyPo replyPo :replyPos){
            System.out.println(JSON.toJSON(replyPo));
        }
    }
}
