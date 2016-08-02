package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.IndustryGradeMapper;
import web.pojo.before.Industry;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/28.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class IndustryMapperTest {

    @Resource
    private IndustryGradeMapper industryGradeMapper;
    @Test
    public void test(){
        ArrayList<Industry> industries = industryGradeMapper.getIndustryAssess();
        for(Industry tempIndustry : industries){
            System.out.println(JSON.toJSON(tempIndustry));
        }
    }
}
