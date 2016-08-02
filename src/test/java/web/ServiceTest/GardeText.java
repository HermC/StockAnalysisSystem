package web.ServiceTest;

import org.junit.Test;
import org.junit.runners.JUnit4;

/**
 * Created by linyufan on 16/5/13.
 */

public class GardeText   {
    @Test
    public void test(){
        for(int i=0;i<10;i++) {
            double temp = 0.1*i ;
            double result = (1 - 1 / (Math.pow(1.35, temp*10))) * 40 + 60;
            System.out.println(result);
        }
    }
}
