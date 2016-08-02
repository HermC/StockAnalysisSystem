package web.daoTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.IndustryGradeMapper;

import javax.annotation.Resource;

/**
 * Created by linyufan on 16/5/28.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class IndustryInnnerTest {

    @Resource
    private IndustryGradeMapper industryGradeMapper;
    @Test
    public void test(){
        System.out.println("test IndustryInnnerTest");
    }
}
