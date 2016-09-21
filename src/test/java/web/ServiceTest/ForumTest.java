package web.ServiceTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.pojo.after.TopicPo;
import web.service.UserSystemBL.ForumService;

import javax.annotation.Resource;
import javax.persistence.Table;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/9/11.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class ForumTest {

    @Resource
    public ForumService forumService;
    @Test
    public void test1(){
        System.out.println(forumService.addtopic("2","145","i'm zsd","11"));
    }

    @Test
    public void test2(){
//        forumService.replytopic("2","1","i'm yzy");
//        forumService.replyreply("2","1","i'm zcj");
        forumService.replyreply("2","2","6","i'm zcj");

    }

    @Test
    public void test3(){
//        ArrayList<TopicPo> topicPos = forumService.getAllTopic();
        ArrayList<TopicPo> topicPos = forumService.getSearch("1");
        for(TopicPo topicPo:topicPos){
            System.out.println(JSON.toJSON(topicPo));
        }
    }

    @Test
    public void test4(){
        TopicPo topicPo = forumService.getTopic("2");
        System.out.println(JSON.toJSON(topicPo));
    }

    @Test
    public void test5(){
        forumService.updateclickcount("1");
    }
}
