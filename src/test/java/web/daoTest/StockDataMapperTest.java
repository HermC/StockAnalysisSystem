package web.daoTest;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import web.dao.StockDataMapper;
import web.pojo.before.StockRelativeData;
import web.pojo.before.TabTablesData;

import java.time.LocalDate;
import java.util.ArrayList;

/**
 * Created by yqq on 2016.5.12.
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class StockDataMapperTest {

        private static Logger logger = Logger.getLogger(StockDataMapperTest.class);

        @Autowired
        private StockDataMapper stockMapper;

        @Test
        public void getTabTablesDataTest() {
                ArrayList<String> idlist = new ArrayList<>();
                idlist.add("sh600000");
//                idlist.add("sh600004");
                idlist.add("sh600011");
//                idlist.add("sh600051");
//                idlist.add("sh600209");
//                idlist.add("sh600614");
//                idlist.add("sh600620");
//                idlist.add("sh600622");
//                idlist.add("sh600624");
//                idlist.add("sh600647");
//                idlist.add("sh600730");
//                idlist.add("sh600770");
//                idlist.add("sh600777");
//                idlist.add("sh600800");
//                idlist.add("sh600805");
//                idlist.add("sh600846");

            for(String id :idlist) {
                    System.out.println(id);
                    ArrayList<TabTablesData> candleInfo = stockMapper.getTabTablesData(id, LocalDate.now().minusDays(50).toString(), LocalDate.now().toString());
                    for (TabTablesData tabTablesData
                            : candleInfo)
                            System.out.println(tabTablesData.date);
                    System.out.println();
            }
        }

        @Test
        public void getCandleDataTest() {
//            ArrayList<CandleData> candleInfo = stockMapper.getCandleData("sh600000", LocalDate.now().minusDays(7).toString(),LocalDate.now().toString());
//            logger.info(JSON.toJSONString(candleInfo));
        }

        @Test
        public void testBench(){
//                ArrayList<TabTablesData> tabTablesDatas = stockMapper.getBenchTabtable("hs300",LocalDate.now().minusDays(7).toString(),LocalDate.now().toString());
//                for (TabTablesData tabTablesData
//                        :tabTablesDatas)
//                System.out.println(JSON.toJSON(tabTablesData));
        }

        @Test
        public void testRelative(){
                StockRelativeData stockRelativeData = stockMapper.getRelativeData("sh600000");
                System.out.println(JSON.toJSON(stockRelativeData));
        }


}
