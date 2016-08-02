package web.pojo.before;

/**
 * Created by linyufan on 16/6/9.
 */
public class RecommandPO {

    public Double quantity = new Double(0);

    public Double deviation = new Double(0);

    public void setQuantity(Double quantity) {
        if(quantity==null){
            this.quantity = new Double(0);
        }else {
            this.quantity = quantity;
        }
    }

    public void setDeviation(Double deviation) {
        if(deviation == null){
            this.deviation = new Double(0);
        }else {
            this.deviation = deviation;
        }
    }
}
