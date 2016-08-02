package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.SingleInfoMapper;
import web.pojo.before.SingleInfo;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/6/2.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class SingleInfoMapperTest {
    @Resource
    private SingleInfoMapper singleInfoMapper;

    @Test
    public void SingleTest(){
        ArrayList<SingleInfo> singleInfo = singleInfoMapper.getSingleInfo();
        System.out.println(singleInfo.size());
        for(SingleInfo singleInfo1 :singleInfo){
            System.out.println(JSON.toJSON(singleInfo1));
        }
    }

}
