package web.backtestingTest;

import org.junit.Test;

/**
 * Created by NJU on 2016/9/4.
 */
public class BackTesting {
    @Test
//    测试不可用，因为编译的文件在test-class中，而非在class中
    public void test(){
        web.Tools.backtesting.BackTesting backTesting = new web.Tools.backtesting.BackTesting(8, 3);
//        backTesting.getPyCode();
        backTesting.runBacktesting();
    }
}
