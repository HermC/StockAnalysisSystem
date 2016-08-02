package web.daoTest;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.service.stock_presentation.TabTableInstructionService;

import javax.annotation.Resource;

/**
 * Created by Hermit on 16/6/6.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class TabTableInstructionServiceTest {
    private static Logger logger = Logger.getLogger(TabTableInstructionServiceTest.class);

    @Resource
    private TabTableInstructionService tabTableInstructionService;

    @Test
    public void test() {
//        ArrayList<TabTableInsVO> tabTableInsVOArrayList = tabTableInstructionService.getTablesInfo("sh600000", LocalDate.now().minusYears(1), LocalDate.now());

//        System.out.println(tabTableInsVOArrayList.get(0).bollgrade);
    }
}
